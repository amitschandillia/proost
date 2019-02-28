// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Models
import Post from '../../models/post';
import Author from '../../models/author';
import Tag from '../../models/tag';
import Category from '../../models/category';

// GraphQL: Resolvers
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all posts
    posts: () => Post
      .find()
      .then(posts => posts.map(post => post._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve post by ID
    post: (root, args) => Post
      .findById(args._id)
      .then(post => post._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve author of given post
  Post: {
    author: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      // Retrieve fields returned by parent, if any
      const fieldsInParent = Object.keys(parent.author._doc);
      // Check if queried fields already exist in parent
      const available = queriedFields.every(field => fieldsInParent.includes(field));
      let authorData = {};
      if (parent.author && available) {
        // If parent data is available and includes queried fields, no need to query db
        authorData = parent.author;
        // return parent.author;
      } else {
        // Otherwise, query db and retrieve data
        authorData = Author.findOne({ 'posts._id': parent._id }, (err, docs) => {
          if (err) { throw err; }
          return docs;
        });
      }
      return authorData;
    },
  },

  // Resolve mutations
  Mutation: {
    // Create a new post
    createPost: async (root, args) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        const currTime = new Date();
        // Operation 1: Add post data to posts collection
        const { isPublished } = args.postData;
        const postObj = args.postData;
        postObj.createdAt = currTime;
        postObj.updatedAt = currTime;
        // args.postData.createdAt = currTime;
        // args.postData.updatedAt = currTime;
        // args.postData.publishedAt = null;
        postObj.publishedAt = null;
        if (isPublished) {
          postObj.publishedAt = currTime;
        }
        const createdPost = await Post(postObj).save(opts);
        // Throw error and abort transaction if operation fails, i.e. createdPost = null
        if (!createdPost) throw new Error('Couldn\'t create post');
        // Work object to be used in the next operation
        const authoredPostObj = { _id: createdPost._id, ...postObj };
        delete authoredPostObj.content;
        const work = {
          posts: authoredPostObj,
        };
        // Operation 2: Add post data to tags collection
        const tagIds = args.postData.tags.map(({ _id }) => _id);
        const updatedTags = await Tag
          .updateMany({ _id: { $in: tagIds } }, { $push: work }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedTag = null
        if (!updatedTags) throw new Error('Couldn\'t update tags');
        // Operation 3: Add post data to authors collection
        const updatedAuthor = await Author
          .findOneAndUpdate({ _id: args.postData.author._id }, { $push: work }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
        if (!updatedAuthor) throw new Error('Couldn\'t update author');
        // Operation 4: Add post data to categories collection
        const updatedCategory = await Category
          .findOneAndUpdate({ _id: args.postData.category._id }, { $push: work }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedCategory = null
        if (!updatedCategory) throw new Error('Couldn\'t update category');

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Return post data as GraphQL response
        return createdPost;
      } catch (err) {
        // Abort and exit
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    },
    // Update an existing post
    updatePost: async (root, args) => {
      const PostDataToUpdate = Object.assign({}, args.newPostData);
      delete PostDataToUpdate.areTagsChanged;
      const currTime = new Date();
      // Start session and transaction
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        const { hasPublishedStatusChanged, isPublished } = args.newPostData;
        let thingsToUpdate = {};
        const fieldsToUpdate = {
          isPublished: args.newPostData.isPublished,
          title: args.newPostData.title,
          titleSecondary: args.newPostData.titleSecondary,
          metaDescription: args.newPostData.metaDescription,
          excerpt: args.newPostData.excerpt,
          slug: args.newPostData.slug,
          readingTime: args.newPostData.readingTime,
          content: args.newPostData.content,
          author: args.newPostData.author,
          tags: args.newPostData.tags,
          category: args.newPostData.category,
          updatedAt: currTime,
        };
        if (hasPublishedStatusChanged && isPublished) {
          thingsToUpdate = {
            $set: {
              ...fieldsToUpdate,
              publishedAt: currTime,
            },
          };
        } else if (hasPublishedStatusChanged && !isPublished) {
          thingsToUpdate = {
            $set: { ...fieldsToUpdate },
            $unset: { publishedAt: '' },
          };
        } else if (!hasPublishedStatusChanged) {
          thingsToUpdate = {
            $set: { ...fieldsToUpdate },
          };
        }
        //  Operation 1: Update post data in posts collection
        const updatedPost = await Post
          .findOneAndUpdate({ _id: args.newPostData._id },
            thingsToUpdate, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedPost = null
        if (!updatedPost) throw new Error('Couldn\'t update post');
        //  Operation 2: Update post data in authors collection
        //  Operation 3: Update post data in tags collection
        //  Operation 4: Update post data in categories collection
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Return updated author as GraphQL response
        return updatedPost;
      } catch (err) {
        // Abort and exit
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    },
  },
};
