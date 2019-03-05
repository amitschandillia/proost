// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Author from '../../models/author';

const opts = { new: true };

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all tags
    authors: () => Author
      .find()
      .then(authors => authors.map(author => author._doc))
      .catch((err) => { throw err }),
    // Retrieve tag by ID
    author: (root, args) => Author.findById(args._id)
      .then(author => author._doc)
      .catch((err) => { throw err }),
  },

  // Resolve mutations
  Mutation: {
    // Create a new author
    createAuthor: async (root, args) => {
      const author = new Author({ ...args.authorInfo });
      return author
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err });
    },
    // Update an existing author
    updateAuthor: async (root, args) => {
      const updatedAuthor = await Author
        .findOneAndUpdate({ _id: args.newAuthorInfo._id },
          {
            $set: { ...args.newAuthorInfo },
          }, opts);
      // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
      if (!updatedAuthor) throw new Error('Couldn\'t update author');
      return updatedAuthor;
    },
  },
};
