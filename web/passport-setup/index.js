import passport from 'passport';
import google from './strategies/google';
import twitter from './strategies/twitter';
import local from './strategies/local';
import User from '../models/user';

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
passport.use(local);
