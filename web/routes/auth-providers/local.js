/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passportSetup from '../../passport-setup';
import signedUserData from '../../utils/signed-user-data';

dotenv.config();

const router = express.Router();
router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
      httpOnly: true,
      secure: true,
    });
    res.json({ success: true });
  });

module.exports = router;
