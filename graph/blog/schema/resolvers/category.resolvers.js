// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Category from '../../models/category';
import Author from '../../models/author';
import Post from '../../models/post';
import Tag from '../../models/tag';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all categories
    categories: () => Category
      .find()
      .then(categories => categories.map(category => category._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve category by ID
    category: (root, args) => Category.findById(args._id)
      .then(category => category._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve posts for given author
  // Category: {},

  // Resolve mutations
  Mutation: {
    // Create a new category
    createCategory: (root, args) => {
      const category = new Category({
        name: args.categoryInfo.name,
        description: args.categoryInfo.description,
      });
      return category
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
  },
};
