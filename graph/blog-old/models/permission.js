import mongoose from 'mongoose';

const permissionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model('Permission', permissionSchema);
