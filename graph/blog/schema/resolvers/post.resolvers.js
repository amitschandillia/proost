// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Models
import Post from '../../models/post';
import Author from '../../models/author';
import Tag from '../../models/tag';

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
        // Operation 1: Insert into posts collection
        const { isPublished } = args.postData;
        let milestones = {};
        const currTime = new Date();
        if (isPublished) {
          milestones = {
            createdAt: currTime,
            updatedAt: currTime,
            publishedAt: currTime,
          };
        } else {
          milestones = {
            createdAt: currTime,
            updatedAt: currTime,
          };
        }
        const postObj = args.postData;
        postObj.isPublished = isPublished;
        postObj.milestones = milestones;
        const createdPost = await Post(postObj).save(opts);
        // Throw error and abort transaction if operation fails, i.e. createdPost = null
        if (!createdPost) throw new Error('Couldn\'t create post');
        // Work object to be used in the next operation
        const authoredPostObj = { _id: createdPost._id, ...postObj };
        delete authoredPostObj.content;
        const work = {
          posts: authoredPostObj,
        };
        // Operation 2: Update tags collection
        const { tags } = args.postData;
        for (let i = 0; i < tags.length; i++) {
          const updatedTag = await Tag // eslint-disable-line no-await-in-loop
            .findOneAndUpdate({ _id: tags[i]._id }, { $push: work }, opts);
          // Throw error and abort transaction if operation fails, i.e. updatedTag = null
          if (!updatedTag) throw new Error('Couldn\'t update tag');
        }
        // Operation 3: Update authors collection
        const updatedAuthor = await Author
          .findOneAndUpdate({ _id: args.postData.author._id }, { $push: work }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
        if (!updatedAuthor) throw new Error('Couldn\'t update author');

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
    // updatePost:
  },
};
