/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passportSetup from '../../passport-setup';

dotenv.config();

const router = express.Router();
router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    console.log('REQ.USER', req.user);

    const signedUserData = jwt.sign({
      userID: req.user._id,
      emails: req.user.emails,
      hasPicture: req.user.hasPicture,
      username: req.user.username,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    }, process.env.JWT_SECRET);
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData, {
      httpOnly: true,
      secure: true,
    });
    res.json({ success: true });
  }
);

module.exports = router;
