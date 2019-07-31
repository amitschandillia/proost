import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  googleID: String,
  twitterID: String,
  emails: [String],
});

const User = mongoose.model('user', userSchema);

module.exports = User;
