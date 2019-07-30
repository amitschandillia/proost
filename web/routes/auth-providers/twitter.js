/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportSetup from '../../passport-setup';

const router = express.Router();
router.get('/', (req, res, next) => {
  req.session.callback = req.query.callback;
  next();
}, passport.authenticate('twitter', { scope: ['profile', 'email'] }));

router.get(
  '/redirect',
  passport.authenticate('twitter'),
  (req, res) => {
    const userDataBareBones = jwt.sign({
      userID: req.user._id,
      googleID: req.user.googleID,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    }, process.env.JWT_SECRET);
    res.cookie('_UDATA.BB', userDataBareBones, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(req.session.callback);
  },
);

module.exports = router;
