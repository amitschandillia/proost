// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
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
      // update author data in authors collection
      // update author data in posts collection
    },
  },
};
