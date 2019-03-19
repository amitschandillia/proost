import mongoose from 'mongoose';

const postAuthor = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
}, { _id: false });

// const postTag = mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
// }, { _id: false });
//
// const postCategory = mongoose.Schema({
//   _id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
// }, { _id: false });

const postSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
    default: '',
  },
  content: {
    type: String,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  isPending: {
    type: Boolean,
  },
  submittedAt: {
    type: Date,
  },
  author: {
    type: postAuthor,
    required: true,
  },
  // tags: {
  //   type: [postTag],
  // },
  // category: {
  //   type: postCategory,
  // },
  isMarkedForDeletion: {
    type: Boolean,
  },
},
{ timestamps: true });

module.exports = mongoose.model('Post', postSchema);
