import mongoose from 'mongoose';

const authorSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('Author', authorSchema);
