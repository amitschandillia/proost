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
      return done(null, user);
    });
  }
);

export default local;
