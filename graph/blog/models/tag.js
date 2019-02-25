import mongoose from 'mongoose';

const taggedPost = mongoose.Schema({
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

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  posts: [taggedPost],
});

module.exports = mongoose.model('Tag', tagSchema);
