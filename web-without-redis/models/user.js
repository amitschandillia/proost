import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  googleID: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
