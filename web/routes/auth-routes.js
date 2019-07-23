/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import session from 'express-session';
import passportSetup from '../config/passport-setup';

const router = express.Router();

router.use(passport.initialize());

router.use(session({ resave: true, secret: '123456', saveUninitialized: true }));

// auth login
router.get('/login', (req, res) => {
  res.send('login...');
});
// auth logout
router.get('/logout', (req, res) => {
  res.send('log out...');
});

router.get('/google', (req, res, next) => {
  req.session.callback = req.query.callback;
  next();
}, passport.authenticate('google', { scope: ['profile'] }));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect(req.session.callback);
});

module.exports = router;
