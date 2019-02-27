// Imports: graphql-fields
import graphqlFields from 'graphql-fields';
// Imports: Models
import Category from '../../models/category';
import Post from '../../models/post';

// Resolve queries
module.exports = {
  // Resolve queries
  Query: {
    // Retrieve all categories
    categories: () => Category
      .find()
      .then(categories => categories.map(category => category._doc))
      .catch((err) => {
        throw err;
      }),
    // Retrieve category by ID
    category: (root, args) => Category.findById(args._id)
      .then(category => category._doc)
      .catch((err) => {
        throw err;
      }),
  },

  // Resolve posts for given category
  Category: {
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
          .find({ 'category._id': parent._id, isPublished }, (err, docs) => {
            if (err) { throw err; }
            return docs;
          });
      }
      return postsData;
    },
  },

  // Resolve mutations
  Mutation: {
    // Create a new category
    createCategory: (root, args) => {
      const category = new Category({
        name: args.categoryInfo.name,
        description: args.categoryInfo.description,
      });
      return category
        .save()
        .then(result => result._doc)
        .catch((err) => {
          throw err;
        });
    },
    // Update an existing tag
  },
};
