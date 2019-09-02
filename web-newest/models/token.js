import mongoose from 'mongoose';

const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: String,
  userId: String,
});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;
