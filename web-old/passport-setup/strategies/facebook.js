import dotenv from 'dotenv';
import FacebookStrategy from 'passport-facebook';

import addOrUpdateUser from '../../utils/add-or-update-user';

dotenv.config();

const facebook = new FacebookStrategy({
  // options for facebook strategy
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: process.env.FACEBOOK_CALLBACK_URI,
  profileFields: ['id', 'emails', 'name'],
}, (accessToken, refreshToken, profile, done) => {
  // passport callback function
  const returnedUser = {
    firstName: profile.name.givenName,
    lastName: profile.name.familyName,
    email: profile.emails[0].value,
    facebookID: profile.id,
    picture: profile.picture,
  };
  addOrUpdateUser(returnedUser, 'facebook', done);
});

export default facebook;
