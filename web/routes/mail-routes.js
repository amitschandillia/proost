import express from 'express';
import sendEmail from '../utils/sendEmail';
import userInDB from '../utils/userInDB';
import uuidv4 from 'uuid/v4';
import createUserWithToken from '../utils/createUserWithToken';
import updateTokenInDB from '../utils/updateTokenInDB';

import { check, validationResult } from 'express-validator';

const router = express.Router();

const sendVerificationEmail = (res, req, to, token, pageURL) => {
  sendEmail(to, token).then(() => {
    res.redirect(pageURL + '?verify=2');
  }). catch((err) => {
    res.redirect(pageURL + '?verify=1');
  });
};

router.post('/', [
  check('to').isEmail(),
], async (req, res) => {
  const errors = validationResult(req);
  const { to = '', pageURL = '/' } = req.body;
  if (!errors.isEmpty()) {
    res.redirect(pageURL + '?verify=1');
  } else {
    // Generate token
    const token = uuidv4();
    // Check if email exists in db
    const existingUser = await userInDB(to);
    if (!existingUser) {
      // Email does not exist in db
      // 1. Create new entry with email and token
      const newUser = await createUserWithToken(to, token);
      // 2. Send verification email with token
      sendVerificationEmail(res, req, to, token, pageURL);
    } else {
      // Email exists in db
      // Retrieve entry and check if it has a token
      if(existingUser.token) {
        // Entry has a token
        // 1. Update token
        const updatedUser = await updateTokenInDB(existingUser._id, token);
        // 2. Send verification email with token
        sendVerificationEmail(res, req, to, token, pageURL);
      } else {
        // Entry does not have a token
        // Check if the entry has a password
        if(existingUser.password) {
          // Entry has a password
          // Throw error: An account with this email already exists
          // (ewarn: 'email already exists' warning )
          res.redirect(pageURL + '?signin=1&ewarn=1');
        } else {
          // Entry does not have a password
          // 1. Add token to entry
          const userWithToken = await updateTokenInDB(existingUser._id, token);
          // 2. Send verification email with token
          sendVerificationEmail(res, req, to, token, pageURL);
        }
      }
    }
  }
});

module.exports = router;
