import mongoose from 'mongoose';

const userpermissionFunction = mongoose.Schema({
  permissionFunction: {
    type: String,
    required: true,
    unique: true,
  },
}, { _id: false });

const userRoleName = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
}, { _id: false });

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  roles: {
    type: [String], // roleName
  },
  permissions: {
    type: [String], // permissionFunction
  },
  apiKey: {
    type: String,
    required: true,
    trim: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
