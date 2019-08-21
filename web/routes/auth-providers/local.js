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
    console.log('REQ.BODY', req.body);
    res.json({ success: true });
  }
);




// const router = express.Router();
// router.get('/', (req, res, next) => {
//   req.session.callback = req.query.callback;
//   next();
// }, passport.authenticate('twitter'));

// router.get(
//   '/redirect',
//   passport.authenticate('twitter', {failureRedirect: '/'}),
//   (req, res) => {
//     const signedUserData = jwt.sign({
//       userID: req.user._id,
//       twitterID: req.user.twitterID,
//       firstName: req.user.firstName,
//       lastName: req.user.lastName,
//     }, process.env.JWT_SECRET);
//     res.cookie(process.env.USER_DATA_COOKIE, signedUserData, {
//       httpOnly: true,
//       secure: true,
//     });
//     res.redirect(req.session.callback);
//   },
// );

module.exports = router;
