'use strict';

// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Author from '../../models/author';

// GraphQL: Resolvers
module.exports = {
  Query: {
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
  },
  Mutation: {
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
