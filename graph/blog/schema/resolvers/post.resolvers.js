'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Post from '../../models/post';
import Author from '../../models/author';

// GraphQL: Resolvers
module.exports = {
  // Resolve queries
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
  // Resolve mutations
  Mutation: {
    createPost: async (root, args, context) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Insert into posts collection
        const createdPost = await Post({
          title: args.postInput.title,
          content: args.postInput.content,
          author: args.postInput.author,
        }).save(opts);
        // Throw error and abort transaction if operation fails, i.e. createdPost = null
        if(!createdPost) throw new Error('Couldn\'t create post');
        // Work object to be used in the next operation
        const work = {
          posts: {
            _id: createdPost._id,
            title: args.postInput.title,
          }
        };
        // Operation 2: Update authors collection
        const updatedAuthor = await Author.
        findOneAndUpdate({_id: args.postInput.author._id}, {$push: work}, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
        if(!updatedAuthor) throw new Error('Couldn\'t update author');
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
  }
};
