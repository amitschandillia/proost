import mongoose from 'mongoose';

const categorynewSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

module.exports = mongoose.model('Categorynew', categorynewSchema);
