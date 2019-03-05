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
    posts: () => Post
      .find()
      .then(posts => posts.map(post => post._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve tag by ID
    post: (root, args) => Post.findById(args._id)
      .then(post => post._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve mutations
  Mutation: {
    // Create a new post
    createPost: async (root, args) => {
      const postData = args.postData;
      if (postData.isPublished) { postData.publishedAt = new Date(); }
      const post = new Post({ ...postData });
      return post
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err });
    },
    // Update an existing author
    updatePost: async (root, args) => {
      let newPostData = args.newPostData;
      const { hasPublishedStatusChanged, isPublished } = newPostData;
      if (hasPublishedStatusChanged && isPublished) {
        newPostData = {
          $set: {
            ...newPostData,
            publishedAt: new Date(),
          },
        };
      } else if (hasPublishedStatusChanged && !isPublished) {
        newPostData = {
          $set: { ...newPostData },
          $unset: { publishedAt: '' },
        };
      } else if (!hasPublishedStatusChanged) {
        newPostData = {
          $set: { ...newPostData },
        };
      }
      const updatedPost = await Post
        .findOneAndUpdate({ _id: args.newPostData._id },
          newPostData, opts);
      // Throw error and abort transaction if operation fails, i.e. updatedPost = null
      if (!updatedPost) throw new Error('Couldn\'t update post');
      return updatedPost;
    },
  },
};
