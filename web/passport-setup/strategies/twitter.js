import dotenv from 'dotenv';
import TwitterStrategy from 'passport-twitter';

import addOrUpdateUser from '../../utils/add-or-update-user';

dotenv.config();

const twitter = new TwitterStrategy({
  // options for twitter strategy
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URI,
  includeEmail: true,
  passReqToCallback: true,
}, (req, token, tokenSecret, profile, done) => {
  // passport callback function
  const name = profile._json.name.split(' ');
  const returnedUser = {
    lastName: name.pop(),
    firstName: name.join(' '),
    email: profile._json.email,
    twitterID: profile._json.id,
    picture: profile._json.profile_image_url_https.replace('_normal', ''),
    lastLoginIP: ip,
  };
  addOrUpdateUser(returnedUser, 'twitter', done);
});

export default twitter;
