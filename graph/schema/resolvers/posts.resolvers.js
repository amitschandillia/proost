'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Post from '../../models/post';

// GraphQL: Resolvers
module.exports = {
  Query: {
    posts: () => {
      return Post
      .find()
      .then(posts => {
        return posts.map(post => {
          return { ...post._doc };
        });
      })
      .catch(err => {
        throw err;
      });
    },
  },
  Mutation: {
    createPost: (root, args, context) => {
      const post = new Post({
        title: args.postInput.title,
        content: args.postInput.content,
        author: args.postInput.author,
      });
      return post
      .save()
      .then(result => {
        return { ...result._doc };
      })
      .catch(err => {
        throw err;
      });
    }
  }
};
