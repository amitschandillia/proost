import dotenv from 'dotenv';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

dotenv.config();

passport.use(
  new GoogleStrategy({
    // options for google strategy
    callbackURL: 'https://www.schandillia.com/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }, () => {
    // passport callback function
  }),
);
