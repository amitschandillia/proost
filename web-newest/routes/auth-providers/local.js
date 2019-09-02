/* eslint-disable no-unused-vars */

import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import uuidv4 from 'uuid/v4';

// import rememberMeCookie from '../../utils/remember-me-cookie';
import Token from '../../models/token';
import passportSetup from '../../passport-setup';
import signedUserData from '../../utils/signed-user-data';
// import getRememberFromCookie from '../../utils/get-remember-from-cookie';
// import getUserinfoFromRemember from '../../utils/get-userinfo-from-remember';
dotenv.config();

const router = express.Router();
// router.post('/',
//   passport.authenticate('local', { failureRedirect: '/' }),
//   async (req, res) => {
//     const {body: {remember_me, username}} = req;
//     if(remember_me) {
//       // Generate hash
//       const rememberCookie = await rememberMeCookie(username);
//       // Store hash in a cookie
//       if(rememberCookie) {
//         res.cookie(process.env.USER_REMEMBER_COOKIE, rememberCookie);
//       }
//     }
//     res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
//       httpOnly: true,
//       secure: true,
//     });
//     res.json({ success: true });
//   });

router.post('/',
  passport.authenticate('local', { failureRedirect: '/' }),

  async (req, res, next) => {
    const { body: { remember_me, username } } = req;
    // issue a remember me cookie if the option was checked
    if (!remember_me) { return next(); }
    const token = uuidv4();
    const tokenEntry = await new Token({ token, userId: req.user.id }).save();
    if(tokenEntry) {
      res.cookie(process.env.USER_REMEMBER_COOKIE, token);
    }
    return next();
  },

  (req, res) => {
    res.cookie(process.env.USER_DATA_COOKIE, signedUserData(req), {
      httpOnly: true,
      secure: true,
    });
    res.json({ success: true });
  }
);

// router.post('/remember', async (req, res) => {
//   const remember = getRememberFromCookie(req);
//   if(remember) {
//     // Check if remember cookie value matches remember field in db
//     const matchedUser = await getUserinfoFromRemember(remember);
//     if(matchedUser) {
//       // Cookie matched
//       res.cookie(process.env.USER_REMEMBER_COOKIE, matchedUser.remember);
//       res.cookie(process.env.USER_DATA_COOKIE, signedUserData({user: matchedUser}), {
//         httpOnly: true,
//         secure: true,
//       });
//       res.json({ success: true });
//     } else {
//       // Cookie match failed
//       res.json({ success: false });
//     }
//   } else {
//     res.json({ success: false });
//   }
// });

module.exports = router;
