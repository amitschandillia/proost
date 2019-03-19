// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Author from '../../models/author';
import Post from '../../models/post';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all authors
    authors: () => Author
      .find()
      .then(authors => authors.map(author => author._doc))
      .catch((err) => { throw err; }),
    // Retrieve tag by ID
    author: (root, args) => Author.findById(args._id)
      .then(author => author._doc)
      .catch((err) => { throw err; }),
  },

  // Resolve posts for given author
  Author: {
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
          'author._id': parent._id,
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
    // Create a new author
    createAuthor: async (root, args) => {
      const author = new Author({ ...args.authorInfo });
      return author
        .save()
        .then(result => result._doc)
        .catch((err) => { throw err; });
    },
    // Update an existing author
    updateAuthor: async (root, args) => {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // Create session object
        const opts = { session, new: true };
        // Operation 1: Update author data in authors collection
        const updatedAuthor = await Author
          .findOneAndUpdate({ _id: args._id },
            {
              $set: { ...args.authorInfo },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
        if (!updatedAuthor) throw new Error('Couldn\'t update author');

        // Operation 2: Update author data in posts collection
        const updatedPosts = await Post
          .updateMany({ 'author._id': args._id },
            {
              $set: {
                'author.firstName': args.authorInfo.firstName,
                'author.lastName': args.authorInfo.lastName,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedPost = null
        if (!updatedPosts) throw new Error('Couldn\'t update post');

        // Commit transaction
        await session.commitTransaction();
        session.endSession();
        // Return updated author as GraphQL response
        return updatedAuthor;
      } catch (err) {
        // Abort and exit
        await session.abortTransaction();
        session.endSession();
        throw err;
      }
    },
  },
};
