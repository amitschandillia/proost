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
    const token = jwt.sign({
      username: req.user.username,
      googleID: req.user.googleID,
    }, process.env.JWT_SECRET);
    res.cookie('token', token);
    res.redirect(req.session.callback);
  },
);

module.exports = router;
