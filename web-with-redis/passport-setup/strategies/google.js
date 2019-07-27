import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../../models/user';

dotenv.config();

const google = new GoogleStrategy({
  // options for google strategy
  callbackURL: process.env.GOOGLE_CALLBACK_URI,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  // Check if user already exists in db
  User.findOne({ googleID: profile.id }).then((existingUser) => {
    if (existingUser) {
      // User already exists in db
      console.log('USER ALREADY EXISTS! ----->', existingUser);
      done(null, existingUser);
    } else {
      // User doesn't exist in db; create new user
      new User({
        username: profile.displayName,
        googleID: profile.id,
      }).save().then((newUser) => {
        console.log('NEW USER CREATED! ---> ', newUser);
        done(null, newUser);
      });
    }
  });
});

export default google;
