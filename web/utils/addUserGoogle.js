import User from '../models/user';
import useProfileImg from './useProfileImg';

const createNewUser = (user, givenEmail, providerID, done) => {
  let emails;
  if (givenEmail) { emails = [givenEmail] }
  new User({
    firstName: user.firstName,
    lastName: user.lastName,
    ...providerID,
    emails,
  }).save().then((newUser) => {
    if(user.picture && (user.picture.length > 1)) {
      // useProfileImg(user.picture, newUser._id);
    }
    done(null, newUser);
  });
};

const getAuthProvider = (provider) => {
  let providerID;
  switch(provider) {
    case 'google':
      providerID = { googleID: user.googleID };
      break;
    case 'twitter':
      providerID = { twitterID: user.twitterID };
      break;
    case 'facebook':
      providerID = { facebookID: user.facebookID };
      break;
    default:
      providerID = {};
  }
  return providerID;
};

const addUser = (user, provider, done) => {
  // Define provider
  const providerID = getAuthProvider(provider);
  // Retrieve email address if provided
  let givenEmail;
  if(user.email && user.email.length > 4) {
    givenEmail = user.email;
  } else {
    givenEmail = null;
  }

  // Lookup user in db
  User.findOne({ ...providerID }).then((existingUser) => {
    // Does the given Google ID exist in db?
    if(existingUser) {
      // Yes, the given Google ID found; does the given email exist in db?
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
      // No, the given Google ID does not exist in db; does the given email exist in db?
      if(givenEmail) { // Was a valid email even provided?
        User.findOne({ emails: givenEmail }).then((anotherUserWithEmail) => {
          if(anotherUserWithEmail){
            // Yes, the given email exists in db; update db with Google ID
            User.findOneAndUpdate(
              {_id: anotherUserWithEmail._id},
              {...providerID}
            ).then((anotherUserWithEmail) => {
              done(null, anotherUserWithEmail);
            });
          } else {
            // Valid email provided but neither that nor Google ID found; create new
            createNewUser(user, givenEmail, providerID, done);
          }
        });
      } else {
        // No valid email provided and given Google ID not found in db; create new
        createNewUser(user, givenEmail, providerID, done);
      }
    }
  });
};
export default addUser;








// does google id exist?
    // yes: does email exist?
        // yes: retrieve existing record
        // no: add email and retrieve updated record
    // no: does email exist?
        // yes: add google id to existing record and retrieve updated record
        // no: create new record and retrieve it
