import mongoose from 'mongoose';

const authornewSchema = mongoose.Schema({
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

module.exports = mongoose.model('Authornew', authornewSchema);
