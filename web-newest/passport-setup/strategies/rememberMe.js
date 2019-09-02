import dotenv from 'dotenv';
import RememberMeStrategy from 'passport-remember-me';

import User from '../../models/user';
import Token from '../../models/token';

dotenv.config();

const rememberMe = new RememberMeStrategy(
  (username, password, done) => {
    User.findOne({ $or: [{ username }, { emails: username }] }, async (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!await user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  },
);

export default rememberMe;





const rememberMe = new RememberMeStrategy(
  (token, done) => {
    Token.consume(token, (err, user) => {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  },
  (user, done) => {
    var token = utils.generateToken(64);
    Token.save(token, { userId: user.id }, function(err) {
      if (err) { return done(err); }
      return done(null, token);
    });
  }
)
