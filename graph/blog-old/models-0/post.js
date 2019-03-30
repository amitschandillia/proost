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
  email: {
    type: String,
    required: true,
  },
  bio: {
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
  }
}, { _id : false });

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
  titleSecondary: {
    type: String,
    trim: true,
  },
  metaDescription: {
    // Use in meta and og description tags
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  readingTime: {
    type: Number,
    required: true,
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
  // createdAt: {
  //   type: Date,
  //   required: true,
  // },
  // updatedAt: {
  //   type: Date,
  //   required: true,
  // },
  publishedAt: {
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
},
{ timestamps: true });

module.exports = mongoose.model('Post', postSchema);

// import mongoose from 'mongoose';

// const postTag = mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
// },{ _id : false });
//
// const postSchema = mongoose.Schema({
//   tags: [postTag],
//   category: {
//     id: {
//       type: String,
//     },
//     name: {
//       type: String,
//     },
//   },
//   stats: {
//     likes: { type: Number },
//     comments: { type: Number },
//     views: { type: Number },
//     bookmarks: { type: Number },
//   },
//   featured_images: {
//     thumbnail: { type: String },
//     banner: { type: String },
//   },
// });
//
// module.exports = mongoose.model('post', postSchema);