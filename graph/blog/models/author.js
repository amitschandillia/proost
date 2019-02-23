'use strict';

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
},{ _id : false });

const authorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  posts: [authoredPost]
});

module.exports = mongoose.model('Author', authorSchema);
