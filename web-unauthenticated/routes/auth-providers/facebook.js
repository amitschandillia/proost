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
}, passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/redirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.cookie(process.env.USER_LANGUAGE_COOKIE, req.user.language || 'en');
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.redirect(pageURL);
  },
);

module.exports = router;
