import dotenv from 'dotenv';
import User from '../models/user';
import useProfileImg from './useProfileImg';

dotenv.config();

const addUser = (user, done) => {
  // Check if user already exists in db
  User.findOne({ googleID: user.googleID }).then((existingUser) => {
    if (existingUser) {
      // User already exists in db
      done(null, existingUser);
    } else { // check if email exists (to be programmed)
      // User doesn't exist in db; create new user
      let emails;
      if(user.email && user.email.length > 4) {
        emails = [user.email];
      }
      new User({
        firstName: user.firstName,
        lastName: user.lastName,
        googleID: user.googleID,
        emails,
      }).save().then((newUser) => {
        // If profile.photos[0].value exists, download image, save it to an S3 bucket, and name it newUser._id.
        if (user.picture && (user.picture.length > 1)) {
          useProfileImg(user.picture, newUser._id);
        }
        done(null, newUser);
      });
    }
  });
};
export default addUser;




// add user via google
//
// sign in with twitter
// check if twitter id exists
//   if not, check if email exists
//     if yes, upsert twitter id in the same user record
//     if no, make a new entry
//   if yes, retrieve existing user
