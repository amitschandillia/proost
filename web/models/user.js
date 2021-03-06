import argon2 from 'argon2';
import mongoose from 'mongoose';

import argonConfigs from '../configs/argon-configs';

const { Schema } = mongoose;

const login = new Schema({
  ip: String,
  country: String,
  countryCode: String,
  city: String,
  continent: String,
  subdivision: String,
  provider: String,
  time: {
    type: Date,
    default: Date.now,
  },
}, { _id : false });

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  language: String,
  googleID: String,
  twitterID: String,
  facebookID: String,
  emails: [String],
  hasPicture: Boolean,
  pictureVersion: String,
  signupToken: String,
  token: String,
  username: String,
  password: String,
  remember: String,
  lastLoginIP: String,
  logins: [login],
});

userSchema.pre('findOneAndUpdate', async function encrypt(next) {
  if (this._update.password) {
    const { password } = this._update;
    this._update.password = await argon2.hash(password, argonConfigs);
  }
  next();
});

userSchema.methods.verifyPassword = async function compare(password) {
  let isVerified = false;
  if (await argon2.verify(this.password, password)) {
    // passwords match
    isVerified = true;
  }
  return isVerified;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
