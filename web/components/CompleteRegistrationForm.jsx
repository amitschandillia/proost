import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import EmailField from './EmailField';
import FirstNameField from './FirstNameField';
import LastNameField from './LastNameField';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import ArgonErrorAlert from './ArgonErrorAlert';
import DbErrorAlert from './DbErrorAlert';
import {validateName, validateUsername, validatePassword } from '../utils/validateRegistrationData';
import completeLocalRegistration from '../utils/completeLocalRegistration';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  signInText: {
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  socialsIcon: {
    paddingLeft: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
});

const CompleteRegistrationForm = (props) => {
  const {
    classes,
    email,
    token,
    expired,
    retrievedData: {
      firstName,
      lastName,
      username,
    },
    firstNameHelper,
    lastNameHelper,
    usernameHelper,
    passwordHelper,
    password2Helper,
    changeFNHelper,
    changeLNHelper,
    changeUNHelper,
    changePassHelper,
    changePass2Helper,
    firstNameError,
    lastNameError,
    usernameError,
    passwordError,
    password2Error,
    argonError,
    dbError,
    raiseFNError,
    raiseLNError,
    raiseUNError,
    raisePassError,
    raisePass2Error,
    raiseArgonError,
    raiseDbError,
  } = props;

  const submitForm = async (e) => {
    const fname = !e.target.fname.disabled && e.target.fname.value.trim();
    const lname = !e.target.lname.disabled && e.target.lname.value.trim();
    const uname = !e.target.uname.disabled && e.target.uname.value.trim();
    const pass = e.target.registerPassword.value.trim();
    const pass2 = e.target.confirmPassword.value.trim();

    let fnameErr = false;
    let lnameErr = false;
    let unameErr = false;
    let passwordErr = false;
    let password2Err = false;

    // Validate first name
    if(fname) {
      const {nameValidationText: fnameValidationText, nameValidationError: fnameValidationError} = validateName(fname);
      changeFNHelper(fnameValidationText);
      raiseFNError(fnameValidationError);
      fnameErr = fnameValidationError;
    }
    // Validate last name
    if(lname) {
      const {nameValidationText: lnameValidationText, nameValidationError: lnameValidationError} = validateName(lname, 'last');
      changeLNHelper(lnameValidationText);
      raiseLNError(lnameValidationError);
      lnameErr = lnameValidationError;
    }
    // Validate username
    if(uname) {
      const {usernameValidationText, usernameValidationError} = validateUsername(uname);
      changeUNHelper(usernameValidationText);
      raiseUNError(usernameValidationError);
      unameErr = usernameValidationError;
    }
    // Validate password
    if(pass) {
      const {passwordValidationText, passwordValidationError} = validatePassword(pass);
      changePassHelper(passwordValidationText);
      raisePassError(passwordValidationError);
      passwordErr = passwordValidationError;
    }
    // Validate password2
    if(pass2) {
      const {passwordValidationText: password2ValidationText, passwordValidationError: password2ValidationError} = validatePassword(pass2, pass);
      changePass2Helper(password2ValidationText);
      raisePass2Error(password2ValidationError);
      password2Err = password2ValidationError;
    }
    // Retrieve server-side validation results and flag fields
    if(!(fnameErr || lnameErr || unameErr || passwordErr || password2Err)) {
      const {validationResults} = await completeLocalRegistration(token, email, fname, lname, uname, pass, pass2);
      if(validationResults.fname) {
        changeFNHelper(validationResults.fname.text);
        raiseFNError(validationResults.fname.err);
      }
      if(validationResults.lname) {
        changeLNHelper(validationResults.lname.text);
        raiseLNError(validationResults.lname.err);
      }
      if(validationResults.uname) {
        changeUNHelper(validationResults.uname.text);
        raiseUNError(validationResults.uname.err);
      }
      if(validationResults.pass) {
        changePassHelper(validationResults.pass.text);
        raisePassError(validationResults.pass.err);
      }
      if(validationResults.pass2) {
        changePass2Helper(validationResults.pass2.text);
        raisePass2Error(validationResults.pass2.err);
      }
      if(validationResults.argonErr) {
        raiseArgonError(validationResults.argonErr);
      }
      if(validationResults.dbErr) {
        raiseDbError(validationResults.dbErr)
      }
    }
  };

  let renderedView;
  if (expired) {
    renderedView = <h3>This link has expired! Please register again</h3>;
  } else {
    renderedView = (
      <Fragment>
        <form onSubmit={(e) => { e.preventDefault(); submitForm(e); }}>
          <EmailField fullWidth={false} disabled value={email} helperText="" required={false} />
          {token && <p>{token}</p>}
          <FirstNameField fullWidth={false} error={firstNameError} disabled={!!firstName} value={firstName} helperText={!firstName && firstNameHelper} required={!firstName} />
          <LastNameField fullWidth={false} error={lastNameError} disabled={!!lastName} value={lastName} helperText={!lastName && lastNameHelper} required={!lastName} />
          <UsernameField fullWidth={false} error={usernameError} disabled={!!username} value={username} helperText={!username && usernameHelper} required={!username} />
          <PasswordField fullWidth={false} error={passwordError} name="registerPassword" label="Enter a Password" id="registerPasswordField" helperText={passwordHelper} />
          <PasswordField fullWidth={false} error={password2Error} name="confirmPassword" label="Confirm Password" id="confirmPasswordField" helperText={password2Helper} />
          <Button
            size="large"
            color="primary"
            type="submit"
            variant="contained"
            className={classes.margin}
          >
            Submit
          </Button>
        </form>
        <ArgonErrorAlert />
        <DbErrorAlert />
      </Fragment>
    );
  }

  return renderedView;
};

CompleteRegistrationForm.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  firstNameHelper: state.firstNameHelper,
  lastNameHelper: state.lastNameHelper,
  usernameHelper: state.usernameHelper,
  passwordHelper: state.passwordHelper,
  password2Helper: state.password2Helper,
  firstNameError: state.firstNameError,
  lastNameError: state.lastNameError,
  usernameError: state.usernameError,
  passwordError: state.passwordError,
  password2Error: state.password2Error,
  argonError: state.argonError,
  dbError: state.dbError,
});

const mapDispatchToProps = dispatch => ({
  changeFNHelper: (helper) => { dispatch({ type: 'CHANGEFNHELPER', payload: helper }); },
  raiseFNError: (error = true) => { dispatch({ type: 'TOGGLEFNERROR', payload: error }); },
  changeLNHelper: (helper) => { dispatch({ type: 'CHANGELNHELPER', payload: helper }); },
  raiseLNError: (error = true) => { dispatch({ type: 'TOGGLELNERROR', payload: error }); },
  changeUNHelper: (helper) => { dispatch({ type: 'CHANGEUNHELPER', payload: helper }); },
  raiseUNError: (error = true) => { dispatch({ type: 'TOGGLEUNERROR', payload: error }); },
  changePassHelper: (helper) => { dispatch({ type: 'CHANGEPASSHELPER', payload: helper }); },
  raisePassError: (error = true) => { dispatch({ type: 'TOGGLEPASSERROR', payload: error }); },
  changePass2Helper: (helper) => { dispatch({ type: 'CHANGEPASS2HELPER', payload: helper }); },
  raisePass2Error: (error = true) => { dispatch({ type: 'TOGGLEPASS2ERROR', payload: error }); },
  raiseArgonError: (error = true) => { dispatch({ type: 'TOGGLEARGONERROR', payload: error }); },
  raiseDbError: (error = true) => { dispatch({ type: 'TOGGLEDBERROR', payload: error }); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(CompleteRegistrationForm));
