import mongoose from 'mongoose';

const postnewAuthor = mongoose.Schema({
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

const postnewTag = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, { _id : false });

const postnewCategory = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
}, { _id: false });

const postnewSchema = mongoose.Schema({
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
    type: postnewAuthor,
    required: true,
  },
  tags: {
    type: [postnewTag],
  },
  category: {
    type: postnewCategory,
  },
},
{ timestamps: true });

module.exports = mongoose.model('Postnew', postnewSchema);
