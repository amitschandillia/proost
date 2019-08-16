import express from 'express';
import sendEmail from '../utils/sendEmail';
import userInDB from '../utils/userInDB';
import uuidv4 from 'uuid/v4';
import createUserWithToken from '../utils/createUserWithToken';
import updateTokenInDB from '../utils/updateTokenInDB';

import { check, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const email = req.query.i;
  const token = req.query.t;
  // Check if email exists in db
  const existingUser = await userInDB(email);
  let userToken;
  if(existingUser) { userToken = existingUser.token; }
  if(!(userToken && (token === userToken))) {
    // Throw error - this link has expired
    req.expired = true;
    next();
  } else {
    req.existingUser = existingUser;
  }
  next();
});

module.exports = router;
