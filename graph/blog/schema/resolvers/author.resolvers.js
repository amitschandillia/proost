// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Mongoose
import mongoose from 'mongoose';
// Imports: Models
import Author from '../../models/author';
import Post from '../../models/post';
import Tag from '../../models/tag';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all authors
    authors: () => Author
      .find()
      .then(authors => authors.map(author => author._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve author by ID
    author: (root, args) => Author.findById(args._id)
      .then(author => author._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve posts for given author
  Author: {
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
          .find({ 'author._id': parent._id, isPublished }, (err, docs) => {
            if (err) { throw err; }
            return docs;
          });
      }
      return postsData;
    },
  },

  // Resolve mutations
  Mutation: {
    // Create a new author
    createAuthor: (root, args) => {
      const author = new Author({
        firstName: args.authorData.firstName,
        lastName: args.authorData.lastName,
        email: args.authorData.email,
        bio: args.authorData.bio,
      });
      return author
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
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
          .findOneAndUpdate({ _id: args.newAuthorData._id },
            {
              $set: {
                firstName: args.newAuthorData.firstName,
                lastName: args.newAuthorData.lastName,
                email: args.newAuthorData.email,
                bio: args.newAuthorData.bio,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthor = null
        if (!updatedAuthor) throw new Error('Couldn\'t update author');
        // Operation 2: Update author data in posts collection
        const updatedPost = await Post
          .updateMany({ 'author._id': args.newAuthorData._id },
            {
              $set: {
                'author.firstName': args.newAuthorData.firstName,
                'author.lastName': args.newAuthorData.lastName,
                'author.email': args.newAuthorData.email,
                'author.bio': args.newAuthorData.bio,
              },
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedPost = null
        if (!updatedPost) throw new Error('Couldn\'t update post');
        // Operation 3: Update author data in tags collection
        const updatedAuthorInTags = await Tag
          .updateMany({ 'posts.author._id': args.newAuthorData._id },
            {
              $set: {
                'posts.$.author.firstName': args.newAuthorData.firstName,
                'posts.$.author.lastName': args.newAuthorData.lastName,
                'posts.$.author.email': args.newAuthorData.email,
                'posts.$.author.bio': args.newAuthorData.bio,
              }
            }, opts);
        // Throw error and abort transaction if operation fails, i.e. updatedAuthorInTags = null
        if (!updatedAuthorInTags) throw new Error('Couldn\'t update tag');
        // Operation 4: Update author data in categories collection
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
