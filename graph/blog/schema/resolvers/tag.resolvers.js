// Imports: graphql-fields
// import graphqlFields from 'graphql-fields';
// Imports: Models
import Tag from '../../models/tag';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all tags
    tags: () => Tag
      .find()
      .then(tags => tags.map(tag => tag._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve tag by ID
    tag: (root, args) => Tag.findById(args._id)
      .then(tag => tag._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve posts for given tag
  // Tag: {},

  // Resolve mutations
  Mutation: {
    // Create a new author
    createTag: (root, args) => {
      const tag = new Tag({
        name: args.tagInput.name,
        description: args.tagInput.description,
      });
      return tag
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
  },
};
