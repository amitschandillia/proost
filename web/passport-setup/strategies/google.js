import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import addOrUpdateUser from '../../utils/add-or-update-user';

dotenv.config();

const google = new GoogleStrategy({
  // options for google strategy
  callbackURL: process.env.GOOGLE_CALLBACK_URI,
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  const returnedUser = {
    firstName: profile._json.given_name,
    lastName: profile._json.family_name,
    email: profile._json.email,
    googleID: profile._json.sub,
    picture: profile._json.picture,
  };
  addOrUpdateUser(returnedUser, 'google', done);
});

export default google;
