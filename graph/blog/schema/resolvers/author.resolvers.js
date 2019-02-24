'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Author from '../../models/author';
import Post from '../../models/post';
// Imports: graphql-fields
const graphqlFields = require('graphql-fields');

// GraphQL: Query resolvers
module.exports = {
  Query: {
    // Retrieve all authors
    authors: () => {
      return Author
      .find()
      .then(authors => {
        return authors.map(author => {
          return { ...author._doc };
        });
      })
      .catch(err => {
        throw err;
      });
    },
    // Retrieve author by ID
    author: (root, args, context) => {
      return Author.findById(args._id)
      .then(author => {
        return author._doc;
      })
      .catch(err => {
        throw err;
      });
    },
  },

  // GraphQL: Other resolvers
  Author: {
    posts: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      // Retrieve fields returned by parent, if any
      const fieldsInParent = Object.keys(parent.posts[0]._doc);
      // Check if queried fields already exist in parent
      const available = queriedFields.every((field) => fieldsInParent.includes(field));
      if(parent.posts && available) {
        // If parent data is available and includes queried fields, no need to query db
        return parent.posts;
      }
      else {
        // Otherwise, query db and retrieve data
        return Post
        .find({'author._id': parent._id}, (err, docs) => {
          if (docs){ return docs; }
          if (err){ throw err; }
        });
      }
    },
  },

  // GraphQL: Mutation resolvers
  Mutation: {
    // Create a new author
    createAuthor: (root, args, context) => {
      const author = new Author({
        firstName: args.authorInput.firstName,
        lastName: args.authorInput.lastName,
      });
      return author
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
