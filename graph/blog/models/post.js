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
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
  milestones: {
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    publishedAt: { type: Date },
  },
  author: postAuthor,
});

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
//   _id: mongoose.Schema.Types.ObjectId,
//   slug: {
//     type: String,
//     required: true,
//   },
//   reading_time: {
//     type: Number,
//     required: true,
//   },
//   isPublished: {
//     // True if published, False if draft
//     type: Boolean,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   title_secondary: {
//     type: String,
//   },
//   meta_description: {
//     // Use in meta and og description tags
//     type: String,
//   },
//   excerpt: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   author: {
//     id: {
//       type: String,
//       required: true,
//     },
//     first_name: {
//       type: String,
//       required: true,
//     },
//     last_name: {
//       type: String,
//       required: true,
//     },
//   },
//   events: {
//     created_at: { type: Date, required: true },
//     published_at: { type: Date },
//     last_modified_at: { type: Date },
//   },
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
