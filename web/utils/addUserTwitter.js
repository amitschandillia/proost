import User from '../models/user';
import useProfileImg from './useProfileImg';

const createNewUser = (user, givenEmail, done) => {
  let emails;
  if (givenEmail) { emails = [givenEmail] }

  new User({
    firstName: user.firstName,
    lastName: user.lastName,
    twitterID: user.twitterID,
    emails,
  }).save().then((newUser) => {
    if(user.picture && (user.picture.length > 1)) {
      // useProfileImg(user.picture, newUser._id);
    }
    done(null, newUser);
  });
};

const addUser = (user, done) => {
  // Retrieve email address if provided
  let givenEmail;
  if(user.email && user.email.length > 4) {
    givenEmail = user.email;
  } else {
    givenEmail = null;
  }

  // Lookup user in db
  User.findOne({ twitterID: user.twitterID }).then((existingUser) => {
    // Does the given Twitter ID exist in db?
    if(existingUser) {
      // Yes, the given Twitter ID found; does the given email exist in db?
      if(givenEmail) { // Was a valid email even provided?
        User.findOne({ emails: givenEmail }).then((existingUserWithEmail) => {
          if(existingUserWithEmail) {
            // Yes, the given email exists in db
            done(null, existingUserWithEmail);
          } else {
            // No, the given email does not exist in db; update db
            User.findOneAndUpdate(
              {_id: existingUser._id},
              { $push: { emails: givenEmail  } },
            ).then((updatedUser) => {
              done(null, updatedUser);
            });
          }
        });
      }
    } else {
      // No, the given Twitter ID does not exist in db; does the given email exist in db?
      if(givenEmail) { // Was a valid email even provided?
        User.findOne({ emails: givenEmail }).then((anotherUserWithEmail) => {
          if(anotherUserWithEmail){
            // Yes, the given email exists in db; update db with Twitter ID
            User.findOneAndUpdate(
              {_id: anotherUserWithEmail._id},
              {twitterID: user.twitterID}
            ).then((anotherUserWithEmail) => {
              done(null, anotherUserWithEmail);
            });
          } else {
            // Valid email provided but neither that nor Twitter ID found; create new
            createNewUser(user, givenEmail, done);
          }
        });
      } else {
        // No valid email provided and given Twitter ID not found in db; create new
        createNewUser(user, givenEmail, done);
      }
    }
  });
};
export default addUser;








// does twitter id exist?
    // yes: does email exist?
        // yes: retrieve existing record
        // no: add email and retrieve updated record
    // no: does email exist?
        // yes: add twitter id to existing record and retrieve updated record
        // no: create new record and retrieve it
