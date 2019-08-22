/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passportSetup from '../../passport-setup';

dotenv.config();

let pageURL = '/';

const router = express.Router();
router.get('/', (req, res, next) => {
  pageURL = req.query.callback;
  next();
}, passport.authenticate('twitter'));

router.get(
  '/redirect',
  passport.authenticate('twitter', {failureRedirect: '/'}),
  (req, res) => {
    const signedUserData = jwt.sign({
      userID: req.user._id,
      twitterID: req.user.twitterID,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    }, process.env.JWT_SECRET);
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(pageURL);
  },
);

module.exports = router;
