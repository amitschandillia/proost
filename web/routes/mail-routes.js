import express from 'express';
import uuidv4 from 'uuid/v4';
import { check, validationResult } from 'express-validator';
import sendEmail from '../utils/sendEmail';
import userInDB from '../utils/userInDB';
import createUserWithToken from '../utils/createUserWithToken';
import updateTokenInDB from '../utils/updateTokenInDB';

const router = express.Router();

const sendVerificationEmail = (res, req, to, token) => {
  sendEmail(to, token).then(() => {
    res.json({ verify: 2 });
  }).catch(() => {
    res.json({ verify: 1 });
  });
};

router.post('/', [
  check('to').isEmail(),
], async (req, res) => {
  // Is email address valid?
  const errors = validationResult(req);
  const { to = '' } = req.body;
  if (!errors.isEmpty()) {
    res.json({ verify: 1 });
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
      if (newUser) {
        sendVerificationEmail(res, req, to, token);
      } else { res.json({ verify: 1 }); }
    } else if (existingUser.token) {
      // Email exists in db
      // Retrieved entry and checked if it has a token
      // Entry has a token
      // 1. Update token
      const updatedUser = await updateTokenInDB(existingUser._id, token);
      // 2. Send verification email with token
      if (updatedUser) {
        sendVerificationEmail(res, req, to, token);
      } else { res.json({ verify: 1 }); }
    } else if (existingUser.password) {
      // Entry does not have a token
      // Checked if the entry has a password
      // Entry has a password
      // Throw error: An account with this email already exists
      // (ewarn: 'email already exists' warning )
      res.json({
        signin: 1,
        ewarn: 1,
      });
    } else {
      // Entry does not have a password
      // 1. Add token to entry
      const userWithToken = await updateTokenInDB(existingUser._id, token);
      // 2. Send verification email with token
      if (userWithToken) {
        sendVerificationEmail(res, req, to, token);
      } else { res.json({ verify: 1 }); }
    }
  }
});

module.exports = router;
