import mongoose from 'mongoose';

const tagnewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('Tagnew', tagnewSchema);
