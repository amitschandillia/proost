import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import getInitials from './get-initials';
import getNameToAddress from './get-name-to-address';

dotenv.config();

const signedUserData = (req) => {
  const initials = getInitials(req.user.firstName, req.user.lastName, req.user.username);
  const nameToAddress = getNameToAddress(req.user.firstName, req.user.lastName, req.user.username);
  const payloadObject = {
    userID: req.user._id,
    googleID: req.user.googleID,
    twitterID: req.user.twitterID,
    facebookID: req.user.facebookID,
    username: req.user.username,
    hasPicture: req.user.hasPicture,
    versionID: req.user.versionID,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    emails: req.user.emails,
    initials,
    nameToAddress,
  };
  return jwt.sign(payloadObject, process.env.JWT_SECRET);
};

export default signedUserData;
