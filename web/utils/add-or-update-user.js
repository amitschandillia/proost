import uuidv4 from 'uuid/v4';
import User from '../models/user';
import useProfileImg from './use-profile-img';

const fieldExists = (field) => {
  let itExists = true;
  if (!field || typeof field === 'undefined' || field.length < 1) {
    itExists = false;
  }
  return itExists;
};

const createNewUser = (user, givenEmail, providerID, hasPicture, pictureVersion, done) => {
  let emails;
  if (givenEmail) { emails = [givenEmail]; }
  new User({
    firstName: user.firstName,
    lastName: user.lastName,
    ...providerID,
    emails,
    hasPicture,
    pictureVersion,
  }).save().then((newUser) => {
    if (hasPicture) {
      useProfileImg(user.picture, newUser._id, pictureVersion);
    }
    done(null, newUser);
  });
};

const getAuthProvider = (provider, user) => {
  let providerID;
  switch (provider) {
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

const addOrUpdateUser = (user, provider, done) => {
  let fn = {};
  let ln = {};
  let pictureVersion;
  // Define provider
  const providerID = getAuthProvider(provider, user);
  // Retrieve email address if provided
  let givenEmail;
  let givenImage;
  let hasPicture;
  if (user.email && user.email.length > 4) {
    givenEmail = user.email;
  } else {
    givenEmail = null;
  }
  // Retrieve image URL if provided
  if (user.picture && (user.picture.length > 1)) {
    givenImage = user.picture;
    hasPicture = true;
  } else {
    givenImage = null;
    hasPicture = false;
  }

  // Lookup user in db
  User.findOne({ ...providerID }).then((existingUser) => {
    // Does the given provider ID exist in db?
    if (existingUser) {
      // Validate name fields
      if (!fieldExists(existingUser.firstName)) {
        fn = { firstName: user.firstName };
      }
      if (!fieldExists(existingUser.lastName)) {
        ln = { lastName: user.lastName };
      }
      // Yes, the given provider ID found; does the given email exist in db?
      if (givenEmail) { // Was a valid email even provided?
        if (existingUser.emails.includes(givenEmail)) {
          // Yes, the given email exists in db; does existing user have an image?
          if (existingUser.hasPicture) {
            // Yes, existing user already has a picture
            done(null, existingUser);
          } else if (givenImage) {
            // Existing user doesn't have picture but valid picture provided
            pictureVersion = uuidv4();
            User.findOneAndUpdate(
              { _id: existingUser._id },
              {
                hasPicture: true, pictureVersion, ...fn, ...ln,
              },
              { new: true },
            ).then((updatedUserWithPic) => {
              useProfileImg(givenImage, updatedUserWithPic._id, pictureVersion);
              done(null, updatedUserWithPic);
            });
          }
          done(null, existingUser);
        } else if (existingUser.hasPicture) {
          // The given email doesn't exist in db
          // But existing user has a picture; just add email and return
          User.findOneAndUpdate(
            { _id: existingUser._id },
            { $push: { emails: givenEmail }, ...fn, ...ln },
            { new: true },
          ).then((updatedUserWithEmail) => {
            done(null, updatedUserWithEmail);
          });
        } else {
          // No existing user doesn't have a picture either; update both picture and email
          pictureVersion = uuidv4();
          User.findOneAndUpdate(
            { _id: existingUser._id },
            {
              $push: { emails: givenEmail },
              hasPicture: true,
              pictureVersion,
              ...fn,
              ...ln,
            },
            { new: true },
          ).then((updatedUserWithEmailAndPic) => {
            useProfileImg(givenImage, updatedUserWithEmailAndPic._id, pictureVersion);
            done(null, updatedUserWithEmailAndPic);
          });
        }
      } else if (existingUser.hasPicture) {
        // No email provided to look up; but provider ID exists in db
        // Check if existinguser has a picture
        // Yes existing user has a picture; return existing user
        done(null, existingUser);
      } else if (givenImage) {
        // No, existing user does not have picture but an image has been provided
        // pdate picture and return
        pictureVersion = uuidv4();
        User.findOneAndUpdate(
          { _id: existingUser._id },
          {
            hasPicture: true,
            pictureVersion,
            ...fn,
            ...ln,
          },
          { new: true },
        ).then((updatedUserWithPicNoEmail) => {
          useProfileImg(givenImage, updatedUserWithPicNoEmail._id, pictureVersion);
          done(null, updatedUserWithPicNoEmail);
        });
      } else {
        done(null, existingUser);
      }
    } else if (givenEmail) {
      // No, the given provider ID does not exist in db
      // Check if the given email exists in db
      // Was an email even provided? Yes
      User.findOne({ emails: givenEmail }).then((userWithMatchingEmail) => {
        if (userWithMatchingEmail) {
          // Validate name fields
          if (!fieldExists(userWithMatchingEmail.firstName)) {
            fn = { firstName: user.firstName };
          }
          if (!fieldExists(userWithMatchingEmail.lastName)) {
            ln = { lastName: user.lastName };
          }
          // given email exists in db; check if user has picture
          if (userWithMatchingEmail.hasPicture) {
            // userwithmatching email also has picture; just add providerID and return
            User.findOneAndUpdate(
              { _id: userWithMatchingEmail._id },
              { ...providerID, ...fn, ...ln },
              { new: true },
            ).then((userWithMatchingEmailUpdatedID) => {
              done(null, userWithMatchingEmailUpdatedID);
            });
          } else if (givenImage) {
            // User in db does not have picture
            // Add picture AND providerID and return
            pictureVersion = uuidv4();
            User.findOneAndUpdate(
              { _id: userWithMatchingEmail._id },
              {
                ...providerID,
                ...fn,
                ...ln,
                hasPicture: true,
                pictureVersion,
              },
              { new: true },
            ).then((userWithMatchingEmailUpdatedIDandPic) => {
              useProfileImg(givenImage, userWithMatchingEmailUpdatedIDandPic._id, pictureVersion);
              done(null, userWithMatchingEmailUpdatedIDandPic);
            });
          } else {
            // User in db does not have picture and no picture provided
            // Just add providerID and return
            User.findOneAndUpdate(
              { _id: userWithMatchingEmail._id },
              { ...providerID, ...fn, ...ln },
              { new: true },
            ).then((userWithMatchingEmailUpdatedIDnoPic) => {
              done(null, userWithMatchingEmailUpdatedIDnoPic);
            });
          }
        } else {
          // Neither providerID, nor email exists in db; create new user
          pictureVersion = uuidv4();
          createNewUser(user, givenEmail, providerID, hasPicture, pictureVersion, done);
        }
      });
    } else {
      // No, provider ID does not exist in db and no email was provided; create new user
      pictureVersion = uuidv4();
      createNewUser(user, givenEmail, providerID, hasPicture, pictureVersion, done);
    }
  });
};
export default addOrUpdateUser;

// does provider id exist?
// yes: does email exist?
// yes: retrieve existing record
// no: add email and retrieve updated record
// no: does email exist?
// yes: add provider id to existing record and retrieve updated record
// no: create new record and retrieve it
