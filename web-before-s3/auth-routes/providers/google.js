/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import passportSetup from '../../passport-setup';

const router = express.Router();
router.get('/', (req, res, next) => {
  req.session.callback = req.query.callback;
  next();
}, passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/redirect',
  passport.authenticate('google'),
  (req, res) => {
    const userDataBareBones = jwt.sign({
      googleID: req.user.googleID,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      picture: req.user.picture,
    }, process.env.JWT_SECRET);
    res.cookie('_UDATA.BB', userDataBareBones, {
      httpOnly: true,
      secure: true,
    });
    res.redirect(req.session.callback);
  },
);

module.exports = router;
