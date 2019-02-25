// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: graphql-fields
// import graphqlFields from 'graphql-fields';
// Imports: Models
import Tag from '../../models/tag';
import Post from '../../models/post';

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
    // Create a new tag
    createTag: (root, args) => {
      const tag = new Tag({
        name: args.tagInfo.name,
        description: args.tagInfo.description,
      });
      return tag
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
    updateTag: async (root, args) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Update tags collection
        const updatedTag = await Tag
          .findOneAndUpdate({ _id: args.oldTagInfo._id },
            { $set: {
              name: args.oldTagInfo.name,
              description: args.oldTagInfo.description
            }
          }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedTag = null
        if (!updatedTag) throw new Error('Couldn\'t update tag');
        // Operation 2: Update tag data in posts collection
        const { posts } = updatedTag;
        for (let i = 0; i < posts.length; i++) {
          // in all post docs with _id == posts[i]._id, retrieve tags array
          // in retrieved tags array, retrieve object where _id == args.oldTagInfo._id
          // in retrieved object, update name = updatedTag.name, description = updatedTag.description
          const updatedPost = await Post
            .updateMany({ 'tags._id': args.oldTagInfo._id },
              // update logic here
              {
                $set: {
                  'tags.$.name': args.oldTagInfo.name,
                  'tags.$.description': args.oldTagInfo.description,
                }
              }, opts
            );
          // Throw error and abort transaction if operation fails, i.e. updatedPost = null
          if (!updatedPost) throw new Error('Couldn\'t update post');
        }
        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Return updated tag as GraphQL response
        return updatedTag;
      } catch (err) {
        // Abort and exit
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    },
  },
};
