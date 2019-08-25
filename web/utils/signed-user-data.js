import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signedUserData = (req) => {
  const payloadObject = {
    userID: req.user._id,
    googleID: req.user.googleID,
    twitterID: req.user.twitterID,
    facebookID: req.user.facebookID,
    username: req.user.username,
    hasPicture: req.user.hasPicture,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    emails: req.user.emails,
  };
  return jwt.sign(payloadObject, process.env.JWT_SECRET);
};

export default signedUserData;
