// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Models
import Post from '../../models/post';
import Author from '../../models/author';

const opts = { new: true };

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all posts
    posts: (root, args) => {
      let isMarkedForDeletion = false;
      let isPublished = true;
      if (typeof args.isPublished !== 'undefined') {
        // eslint-disable-next-line prefer-destructuring
        isPublished = args.isPublished;
      }
      if (typeof args.isMarkedForDeletion !== 'undefined') {
        // eslint-disable-next-line prefer-destructuring
        isMarkedForDeletion = args.isMarkedForDeletion;
      }
      return Post
        .find({
          isMarkedForDeletion: { $exists: isMarkedForDeletion },
          isPublished,
        })
        .then(posts => posts.map(post => post._doc))
        .catch((err) => { throw err; });
    },
    // Retrieve post by ID
    post: (root, args) => Post.findById(args._id)
      .then(post => post._doc)
      .catch((err) => { throw err; }),
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
      } else {
        // Otherwise, query db and retrieve data
        authorData = Author.findOne({ _id: parent.author._id }, (err, docs) => {
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
    // Authentication: Valid user, logged in, author rights and above
    createPost: async (root, args) => {
      const title = `Post #${mongoose.Types.ObjectId().toString()}`;
      const postData = {
        title,
        isPublished: false,
        author: args.postAuthor
      };
      const post = new Post({ ...postData });
      return post
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err; });
    },
    // Update an existing post
    // Authentication (for drafts):
        // Valid user, logged in, author rights and above, original author or editor
    // Authentication (for published works):
        // Valid user, logged in, editor rights and above
    updatePost: async (root, args) => {
      let { postData } = args;
      const { hasPublishedStatusChanged, isPublished } = postData;
      if (hasPublishedStatusChanged && isPublished) {
        postData = {
          $set: {
            ...postData,
            publishedAt: new Date(),
          },
        };
      } else if (hasPublishedStatusChanged && !isPublished) {
        postData = {
          $set: { ...postData },
          $unset: { publishedAt: '' },
        };
      } else if (!hasPublishedStatusChanged) {
        postData = {
          $set: { ...postData },
        };
      }
      const updatedPost = await Post
        .findOneAndUpdate({ _id: args.postData._id },
          postData, opts);
      // Throw error and abort transaction if operation fails, i.e. updatedPost = null
      if (!updatedPost) throw new Error('Couldn\'t update post');
      return updatedPost;
    },
    // Mark post(s) for deletion
    deletePosts: async (root, args) => {
      const idsToBeDeleted = [];
      let isSuccessful = false;
      const { postsToBeDeleted } = args;
      for (let i = 0; i < postsToBeDeleted.length; i += 1) {
        idsToBeDeleted.push(postsToBeDeleted[i]._id);
      }
      const markedPosts = await Post
        .updateMany({ _id: { $in: idsToBeDeleted } },
          {
            $set: { isMarkedForDeletion: true },
          }, opts);
      // Throw error and abort transaction if operation fails, i.e. markedPosts = null
      if (!markedPosts) throw new Error('Couldn\'t mark posts for deletion');
      if (idsToBeDeleted.length === markedPosts.nModified) {
        isSuccessful = true;
      }
      return { isSuccessful };
    },
    // Permanently delete post(s)
    permanentlyDeletePosts: async (root, args) => {
      const idsToBeDeleted = [];
      let isSuccessful = false;
      const { postsToBePermanentlyDeleted } = args;
      for (let i = 0; i < postsToBePermanentlyDeleted.length; i += 1) {
        idsToBeDeleted.push(postsToBePermanentlyDeleted[i]._id);
      }
      const deletedPosts = await Post
        .deleteMany({ _id: { $in: idsToBeDeleted } }, opts);
      // Throw error and abort transaction if operation fails, i.e. deletedPosts = null
      if (!deletedPosts) throw new Error('Couldn\'t delete posts');
      if (idsToBeDeleted.length === deletedPosts.deletedCount) {
        isSuccessful = true;
      }
      return { isSuccessful };
    },
    // Permanently delete all marked posts
    permanentlyDeleteAllMarkedPosts: async (root, args) => {
      const deletedPosts = await Post
        .deleteMany({isMarkedForDeletion: true}, opts);
      // Throw error and abort transaction if operation fails, i.e. deletedPosts = null
      if (!deletedPosts) throw new Error('Couldn\'t delete posts');
      return { isSuccessful: true };
    },
    // Restore post(s) marked for deletion
    restorePosts: async (root, args) => {
      const idsToBeRestored = [];
      let isSuccessful = false;
      const { postsToBeRestored } = args;
      for (let i = 0; i < postsToBeRestored.length; i += 1) {
        idsToBeRestored.push(postsToBeRestored[i]._id);
      }
      const markedPosts = await Post
        .updateMany({ _id: { $in: idsToBeRestored } },
          {
            $unset: { isMarkedForDeletion: false },
          }, opts);
      // Throw error and abort transaction if operation fails, i.e. markedPosts = null
      if (!markedPosts) throw new Error('Couldn\'t mark posts for deletion');
      if (idsToBeRestored.length === markedPosts.nModified) {
        isSuccessful = true;
      }
      return { isSuccessful };
    },
    // Restore all posts marked for deletion
    restoreAllPosts: async (root, args) => {
      const restoredPosts = await Post
        .updateMany({isMarkedForDeletion: true},
          { $unset: { isMarkedForDeletion: false }}, opts);
      // Throw error and abort transaction if operation fails, i.e. restoredPosts = null
      if (!restoredPosts) throw new Error('Couldn\'t restore posts');
      return { isSuccessful: true };
    },
  },
};
