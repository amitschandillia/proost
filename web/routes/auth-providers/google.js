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
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/redirect',
  passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    const signedUserData = jwt.sign({
      userID: req.user._id,
      googleID: req.user.googleID,
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
