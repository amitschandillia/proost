import express from 'express';
import userInDB from '../utils/user-in-db';
import {tokenInDB, createAccount} from '../utils/create-account';
import uuidv4 from 'uuid/v4';
import argon2 from 'argon2';
import createUserWithToken from '../utils/create-user-with-token';
import updateTokenInDB from '../utils/update-token-in-db';
import {validateName, validateUsername, validatePassword} from '../utils/validate-registration-data';
import { check, validationResult } from 'express-validator';
import argonConfigs from '../configs/argon-configs';
import sendConfirmationEmail from '../utils/send-confirmation-email';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const email = req.query.i;
  const token = req.query.t;
  // Check if email exists in db
  const existingUser = await userInDB(email);
  let userToken;
  if(existingUser) { userToken = existingUser.token; }
  if(!(userToken && (token === userToken))) {
    // Throw error - this link has expired
    req.expired = true;
    next();
  } else {
    req.existingUser = existingUser;
  }
  next();
});

router.post('/', async (req, res, next) => {
  const { token, email, fname, lname, uname, pass, pass2 } = req.body;
  let validationResults = {};
  let formErr = false;
  if(fname) {
    const {nameValidationText: fnameValidationText, nameValidationError: fnameValidationError} = validateName(fname);
    validationResults.fname = {text: fnameValidationText, err: fnameValidationError};
    formErr = formErr || fnameValidationError;
  }
  if(lname) {
    const {nameValidationText: lnameValidationText, nameValidationError: lnameValidationError} = validateName(lname, 'last');
    validationResults.lname = {text: lnameValidationText, err: lnameValidationError};
    formErr = formErr || lnameValidationError;
  }
  if(uname) {
    const {usernameValidationText, usernameValidationError} = validateUsername(uname);
    validationResults.uname = {text: usernameValidationText, err: usernameValidationError};
    formErr = formErr || usernameValidationError;
  }
  if(pass) {
    const {passwordValidationText, passwordValidationError} = validatePassword(pass);
    validationResults.pass = {text: passwordValidationText, err: passwordValidationError};
    formErr = formErr || passwordValidationError;
  }
  if(pass2) {
    const {passwordValidationText: password2ValidationText, passwordValidationError: password2ValidationError} = validatePassword(pass2, pass);
    validationResults.pass2 = {text: password2ValidationText, err: password2ValidationError};
    formErr = formErr || password2ValidationError;
  }
  if(formErr) { res.json({ validationResults }); } else {
    // Encrypt password
    try {
      const hashedPass = await argon2.hash(pass, argonConfigs);
      // Lookup db for user who:
      // 1. matches token
      // 2. does not have password
      // 3. matches email
      // Check if token and email exist in db
      const existingUser = await tokenInDB(token, email);
      if(existingUser) {
        // update password and remove token from existingUser
        const updatedUser = await createAccount(fname, lname, uname, hashedPass, existingUser);
        if(updatedUser) {
          // User registered. Send confirmation email
          validationResults = { wasRegistered: true, updatedUser: updatedUser };
          sendConfirmationEmail(email, updatedUser).then(() => {
            // Confirmation email sent; return registered data to browser
            res.json({ validationResults });
          }).catch(() => {
            // User registered but confirmation email not sent; return error to browser
            validationResults.emailErr = true;
            res.json({ validationResults });
          });
        } else {
          // User could not be registered. Throw error: Could not register
          validationResults = { dbErr: true };
          res.json({ validationResults });
        }
      } else {
        // Throw error: Could not register
        validationResults = { dbErr: true };
        res.json({ validationResults });
      }
    } catch (err) {
      // Flag Argon encryption error
      validationResults = { argonErr: true };
      res.json({ validationResults });
    }
  }
});

module.exports = router;
