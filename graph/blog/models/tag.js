import mongoose from 'mongoose';

const tagSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Tag', tagSchema);
