/* eslint-disable no-unused-vars */

import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import passportSetup from '../../passport-setup';
import signedUserData from '../../utils/signed-user-data';
import rememberMeCookie from '../../utils/remember-me-cookie';
import getRememberFromCookie from '../../utils/get-remember-from-cookie';
import getUserinfoFromRemember from '../../utils/get-userinfo-from-remember';
dotenv.config();

const router = express.Router();
router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),
  async (req, res) => {
    const {body: {remember, username}} = req;
    if(remember) {
      // Generate hash
      const rememberCookie = await rememberMeCookie(username);
      // Store hash in a cookie
      if(rememberCookie) {
        res.cookie(process.env.USER_REMEMBER_COOKIE, rememberCookie, {
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
        });
      }
    }
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.json({ success: true });
  });

router.post('/remember', async (req, res) => {
  const remember = getRememberFromCookie(req);
  if(remember) {
    // Check if remember cookie value matches remember field in db
    const matchedUser = await getUserinfoFromRemember(remember);
    if(matchedUser) {
      // Cookie matched
      res.cookie(process.env.USER_REMEMBER_COOKIE, matchedUser.remember, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.cookie(process.env.USER_DATA_COOKIE, signedUserData({user: matchedUser}), {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      });
      res.json({ success: true });
    } else {
      // Cookie match failed
      res.json({ success: false });
    }
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
