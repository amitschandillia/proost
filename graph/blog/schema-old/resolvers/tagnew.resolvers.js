// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Tagnew from '../../models/tagnew';
import Postnew from '../../models/postnew';

const opts = { new: true };

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all tags
    tagsnew: () => Tagnew
      .find()
      .then(tagsnew => tagsnew.map(tagnew => tagnew._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve tag by ID
    tagnew: (root, args) => Tagnew.findById(args._id)
      .then(tagnew => tagnew._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve mutations
  Mutation: {
    // Create a new tag
    createTagnew: (root, args) => {
      const tagnew = new Tagnew({
        name: args.tagInfonew.name,
      });
      return tagnew
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
    updateTagnew: async (root, args) => {
      const updatedTagnew = await Tagnew
        .findOneAndUpdate({ _id: args.newTagInfonew._id },
          {
            $set: {
              name: args.newTagInfonew.name,
            },
          }, opts);
      // Throw error and abort transaction if operation fails, i.e. updatedTag = null
      if (!updatedTagnew) throw new Error('Couldn\'t update tag');
      return updatedTagnew;
    },
  },
};
