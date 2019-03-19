// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Post from '../../models/post';
import Category from '../../models/category';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all categories
    categories: () => Category
      .find()
      .then(categories => categories.map(category => category._doc))
      .catch((err) => { throw err; }),
    // Retrieve tag by ID
    category: (root, args) => Category.findById(args._id)
      .then(category => category._doc)
      .catch((err) => { throw err; }),
  },

  // Resolve posts for given category
  Category: {
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
          'category._id': parent._id,
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
    // Create a new category
    createCategory: async (root, args) => {
      const category = new Category({ ...args.categoryInfo });
      return category
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err; });
    },
    // Update an existing category
    updateCategory: async (root, args) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Update category data in categories collection
        const updatedCategory = await Category
          .findOneAndUpdate({ _id: args._id },
            {
              $set: { ...args.categoryInfo },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedCategory = null
        if (!updatedCategory) throw new Error('Couldn\'t update category');

        // Operation 2: Update category data in posts collection
        const updatedPost = await Post
          .updateMany({ 'category._id': args._id },
            {
              $set: {
                'category.name': args.categoryInfo.name,
                'category.description': args.categoryInfo.description,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedPost = null
        if (!updatedPost) throw new Error('Couldn\'t update post');

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Return updated category as GraphQL response
        return updatedCategory;
      } catch (err) {
        // Abort and exit
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    },
  },
};
