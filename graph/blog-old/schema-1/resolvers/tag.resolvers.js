// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Post from '../../models/post';
import Tag from '../../models/tag';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all tags
    tags: () => Tag
      .find()
      .then(tags => tags.map(tag => tag._doc))
      .catch((err) => { throw err; }),
    // Retrieve tag by ID
    tag: (root, args) => Tag.findById(args._id)
      .then(tag => tag._doc)
      .catch((err) => { throw err; }),
  },

  // Resolve posts for given tag
  Tag: {
    posts: (parent, args) => {
      let isMarkedForDeletion = false;
      let isPublished = true;
      if (typeof args.isPublished !== 'undefined') {
        // eslint-disable-next-line prefer-destructuring
        isPublished = args.isPublished;
      }
      if (typeof args.isMarkedForDeletion !== 'undefined') {
        // eslint-disable-next-line prefer-destructuring
        isMarkedForDeletion = args.isMarkedForDeletion;
      }
      const postsData = Post
        .find({
          'tags._id': parent._id,
          isMarkedForDeletion: { $exists: isMarkedForDeletion },
          isPublished,
        }, (err, docs) => {
          if (err) { throw err; }
          return docs;
        });
      return postsData;
    },
  },

  // Resolve mutations
  Mutation: {
    // Create a new tag
    createTag: async (root, args) => {
      const tag = new Tag({ ...args.tagInfo });
      return tag
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err; });
    },
    // Update an existing tag
    updateTag: async (root, args) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Update tag data in tags collection
        const updatedTag = await Tag
          .findOneAndUpdate({ _id: args._id },
            {
              $set: { ...args.tagInfo },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedTag = null
        if (!updatedTag) throw new Error('Couldn\'t update tag');

        // Operation 2: Update tag data in posts collection
        const updatedPosts = await Post
          .updateMany({ 'tags._id': args._id },
            {
              $set: {
                'tags.$.name': args.tagInfo.name,
                'tags.$.description': args.tagInfo.description,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedPost = null
        if (!updatedPosts) throw new Error('Couldn\'t update post');

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
