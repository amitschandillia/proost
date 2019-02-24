'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Post from '../../models/post';
import Author from '../../models/author';
// Imports: graphql-fields
import graphqlFields from 'graphql-fields';

// GraphQL: Resolvers
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all posts
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
    // Retrieve post by ID
    post: (root, args, context) => {
      return Post
        .findById(args._id)
        .then(post => {
          return post._doc;
        })
        .catch(err => {
          throw err;
        });
    },
  },

  // Resolve author of given post
  Post: {
    author: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      // Retrieve fields returned by parent, if any
      const fieldsInParent = Object.keys(parent.author._doc);
      // Check if queried fields already exist in parent
      const available = queriedFields.every((field) => fieldsInParent.includes(field));
      if(parent.author && available) {
        // If parent data is available and includes queried fields, no need to query db
        return parent.author;
      }
      else {
        // Otherwise, query db and retrieve data
        return Author.findOne({'posts._id': parent._id}, (err, docs) => {
          if (docs){ return docs; }
          if (err){ throw err; }
        });
      }
    },
  },

  // Resolve mutations
  Mutation: {
    // Create a new post
    createPost: async (root, args, context) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Insert into posts collection
        const createdPost = await Post({
          isPublished: args.postInput.isPublished,
          title: args.postInput.title,
          content: args.postInput.content,
          author: args.postInput.author,
          createdAt: new Date(),
          updatedAt: new Date(),
        }).save(opts);
        // Throw error and abort transaction if operation fails, i.e. createdPost = null
        if(!createdPost) throw new Error('Couldn\'t create post');
        // Work object to be used in the next operation
        const work = {
          posts: {
            _id: createdPost._id,
            isPublished: args.postInput.isPublished,
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
