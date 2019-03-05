// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Foo from '../../models/foo';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all foos
    foos: () => Foo
      .find()
      .then(foos => foos.map(foo => foo._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve tag by ID
    tag: (root, args) => Foo.findById(args._id)
      .then(foo => foo._doc)
      .catch((err) => {
        throw err;
      }),
  },
  // Resolve mutations
  Mutation: {
    createFoo: (root, args) => {
      const foo = new Foo({
        title: args.fooInfo.title,
      });
      return foo
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
    updateFoo: (root, args) => {
      const updatedFoo = Foo
        .findOneAndUpdate({ _id: args.newFooInfo._id },
          {
            $set: {
              title: args.newFooInfo.title,
            },
          });
      // Throw error and abort transaction if operation fails, i.e. updatedTag = null
      if (!updatedFoo) throw new Error('Couldn\'t update foo');
      return updatedFoo;
    },
  },
};
