import dotenv from 'dotenv';
import GoogleStrategy from 'passport-google-oauth20';
import User from '../../models/user';
import processProfileImg from '../../utils/process-profile-img';

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
        firstName: profile.name.familyName,
        lastName: profile.name.givenName,
        picture: profile.photos[0].value,
        googleID: profile.id,
      }).save().then((newUser) => {
        console.log('NEW USER CREATED! ---> ', newUser);
        // If profile.photos[0].value exists, download image, save it to an S3 bucket, and name it newUser._id.
        if (profile.photos) {
          if (profile.photos[0]) {
            console.log('IMAGE EXISTS!');
            console.log('NEWUSER', newUser);
            processProfileImg(profile.photos[0].value, newUser._id);
          }
        }
        done(null, newUser);
      });
    }
  });
});

export default google;
