/* eslint-disable no-unused-vars */

import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import passportSetup from '../../passport-setup';
import signedUserData from '../../utils/signed-user-data';

dotenv.config();

let pageURL = '/';

const router = express.Router();
router.get('/', (req, res, next) => {
  pageURL = req.query.callback;
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
      httpOnly: true,
      secure: true,
    });
    res.redirect(pageURL);
  },
);

module.exports = router;
