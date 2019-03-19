import mongoose from 'mongoose';

const postAuthor = mongoose.Schema({
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
}, { _id: false });

const postTag = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { _id: false });

const postCategory = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
}, { _id: false });

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  content: {
    type: String,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  publishedAt: {
    type: Date,
  },
  isPendind: {
    type: Boolean,
  },
  submittedAt: {
    type: Date,
  },
  author: {
    type: postAuthor,
    required: true,
  },
  tags: {
    type: [postTag],
  },
  category: {
    type: postCategory,
  },
  isMarkedForDeletion: {
    type: Boolean,
  },
},
{ timestamps: true });

module.exports = mongoose.model('Post', postSchema);
