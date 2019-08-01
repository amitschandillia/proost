import dotenv from 'dotenv';
import TwitterStrategy from 'passport-twitter';
import addOrUpdateUser from '../../utils/addOrUpdateUser';

dotenv.config();

const twitter = new TwitterStrategy({
  // options for twitter strategy
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URI,
  includeEmail: true,
}, (token, tokenSecret, profile, done) => {
  // passport callback function
  const returnedUser = {
    firstName: profile._json.name.split(' ')[0],
    lastName: profile._json.name.split(' ')[1],
    email: profile._json.email,
    twitterID: profile._json.id,
    picture: profile._json.profile_image_url_https.replace('_normal', ''),
  };
  addOrUpdateUser(returnedUser, 'twitter', done);
});

export default twitter;
