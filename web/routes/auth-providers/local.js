/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passportSetup from '../../passport-setup';
import userPayload from './user-payload';

dotenv.config();

const router = express.Router();
router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    const signedUserData = jwt.sign(userPayload(req), process.env.JWT_SECRET);
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData, {
      httpOnly: true,
      secure: true,
    });
    res.json({success: true});
  }
);

module.exports = router;
