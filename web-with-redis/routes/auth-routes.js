/* eslint-disable no-unused-vars */

import express from 'express';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import passportSetup from '../config/passport-setup';

const RedisStore = connectRedis(session);

const router = express.Router();
router.use(session({
      secret: process.env.SESSION_SECRET,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        ttl: 172800,
      }),
      saveUninitialized: false,
      resave: false,
    }));


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

router.get(
  '/google/redirect',
  passport.authenticate('google'),
  (req, res) => {
    console.log('FROM REDIRECT: ', req.user);
    res.redirect(req.session.callback);
  },
);

module.exports = router;
