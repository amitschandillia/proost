import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  googleID: String,
  email: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
