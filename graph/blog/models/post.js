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

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  publishedAt: {
    type: Date,
  },
  author: {
    type: postAuthor,
    required: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model('Post', postSchema);
