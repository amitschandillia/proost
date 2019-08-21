import dotenv from 'dotenv';
import LocalStrategy from 'passport-local';
import addOrUpdateUser from '../../utils/add-or-update-user';

import User from '../../models/user';

dotenv.config();

const local = new LocalStrategy (
  (username, password, done) => {
    User.findOne({ $or: [{username: username}, {emails: username}] }, async (err, user) => {
      if(err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!await user.verifyPassword(password)) { return done(null, false); }
      // console.log('USER', user);
      return done(null, user);
    });
  }
);




// const LocalStrategy = new LocalStrategy({
//   // options for twitter strategy
//   consumerKey: process.env.TWITTER_CONSUMER_KEY,
//   consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
//   callbackURL: process.env.TWITTER_CALLBACK_URI,
//   includeEmail: true,
// }, (token, tokenSecret, profile, done) => {
//   // passport callback function
//   const name = profile._json.name.split(' ');
//   const returnedUser = {
//     lastName: name.pop(),
//     firstName: name.join(' '),
//     email: profile._json.email,
//     twitterID: profile._json.id,
//     picture: profile._json.profile_image_url_https.replace('_normal', ''),
//   };
//   addOrUpdateUser(returnedUser, 'twitter', done);
// });

export default local;
