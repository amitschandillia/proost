import mongoose from 'mongoose';

const authoredPost = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  titleSecondary: {
    type: String,
  },
  metaDescription: {
    // Use in meta and og description tags
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  readingTime: {
    type: Number,
    required: true,
  },
}, { _id: false });

const authorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
    required: true,
  },
  posts: [authoredPost],
});

module.exports = mongoose.model('Author', authorSchema);
