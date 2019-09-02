import passport from 'passport';

import User from '../models/user';
import facebook from './strategies/facebook';
import google from './strategies/google';
import rememberMe from './strategies/rememberMe';
import local from './strategies/local';
import twitter from './strategies/twitter';

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(google);
passport.use(twitter);
passport.use(facebook);
passport.use(rememberMe);
passport.use(local);
