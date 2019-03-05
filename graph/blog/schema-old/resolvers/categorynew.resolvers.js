// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Categorynew from '../../models/categorynew';
import Postnew from '../../models/postnew';

const opts = { new: true };

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all tags
    categoriesnew: () => Categorynew
      .find()
      .then(categoriesnew => categoriesnew.map(categorynew => categorynew._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve tag by ID
    categorynew: (root, args) => Categorynew.findById(args._id)
      .then(categorynew => categorynew._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve mutations
  Mutation: {
    // Create a new tag
    createCategorynew: (root, args) => {
      const categorynew = new Categorynew({
        name: args.categoryInfonew.name,
      });
      return categorynew
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
    updateCategorynew: async (root, args) => {
      const updatedCategorynew = await Categorynew
        .findOneAndUpdate({ _id: args.newCategoryInfonew._id },
          {
            $set: {
              name: args.newCategoryInfonew.name,
            },
          }, opts);
      // Throw error and abort transaction if operation fails, i.e. updatedCategorynew = null
      if (!updatedCategorynew) throw new Error('Couldn\'t update tag');
      return updatedCategorynew;
    },
  },
};
