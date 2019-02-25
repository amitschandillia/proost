// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
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
  Tag: {
    posts: (parent, args, context, ast) => {
      // Retrieve fields being queried
      const queriedFields = Object.keys(graphqlFields(ast));
      let available = true;
      try {
        // Retrieve fields returned by parent, if any
        const fieldsInParent = Object.keys(parent.posts[0]._doc);
        // Check if queried fields already exist in parent
        available = queriedFields.every(field => fieldsInParent.includes(field));
      } catch (err) {
        available = false;
      }

      const isPublished = (typeof args.isPublished === 'boolean' ? args.isPublished : true);
      let postsData = {};
      if (parent.posts && available) {
        // If parent data is available and includes queried fields, no need to query db
        postsData = parent.posts.filter(post => post.isPublished === isPublished);
      } else {
        // Otherwise, query db and retrieve data
        postsData = Post
          .find({ 'tags._id': parent._id, isPublished }, (err, docs) => {
            if (err) { throw err; }
            return docs;
          });
      }
      return postsData;
    },
  },


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
          .findOneAndUpdate({ _id: args.newTagInfo._id },
            {
              $set: {
                name: args.newTagInfo.name,
                description: args.newTagInfo.description,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedTag = null
        if (!updatedTag) throw new Error('Couldn\'t update tag');
        // Operation 2: Update tag data in posts collection
        const { posts } = updatedTag;
        for (let i = 0; i < posts.length; i++) {
          const updatedPost = await Post // eslint-disable-line no-await-in-loop
            .updateMany({ 'tags._id': args.newTagInfo._id },
              // update logic here
              {
                $set: {
                  'tags.$.name': args.newTagInfo.name,
                  'tags.$.description': args.newTagInfo.description,
                },
              }, opts);
          // Throw error and abort transaction if operation fails, i.e. updatedPost = null
          if (!updatedPost) throw new Error('Couldn\'t update post');
        }
        // Operation 3: Update tag data in authors collection
        // ...
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
