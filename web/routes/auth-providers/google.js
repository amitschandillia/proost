/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportSetup from '../../passport-setup';

const router = express.Router();
router.get('/', (req, res, next) => {
  req.session.callback = req.query.callback;
  next();
}, passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/redirect',
  passport.authenticate('google'),
  (req, res) => {
    const signedUserData = jwt.sign({
      userID: req.user._id,
      googleID: req.user.googleID,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    }, process.env.JWT_SECRET);
    res.cookie('_UDATA.SIG.GG', signedUserData, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(req.session.callback);
  },
);

module.exports = router;
