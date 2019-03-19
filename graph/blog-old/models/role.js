import mongoose from 'mongoose';

const permission = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  permissionName: {
    type: String,
    required: true,
  },
  permissionDescription: {
    type: String,
    required: true,
  },
}, { _id: false });

const roleSchema = mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  roleDescription: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  rolePermissions: [permission],
},
{ timestamps: true });

module.exports = mongoose.model('Role', roleSchema);
