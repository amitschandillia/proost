import mongoose from 'mongoose';

const categorizedPostAuthor = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
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
  },
  bio: {
    type: String,
    required: true,
  },
}, { _id: false });

const categorizedPost = mongoose.Schema({
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
  author: {
    type: categorizedPostAuthor,
    required: true,
  },
}, { _id: false });

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  posts: [categorizedPost],
});

module.exports = mongoose.model('Category', categorySchema);
