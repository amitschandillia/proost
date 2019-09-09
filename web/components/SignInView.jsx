import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import emailValidator from 'email-validator';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import loginUser from '../utils/login-user';
import {
  validatePassword,
  validateUsername,
} from '../utils/validate-registration-data';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import SocialButton from './SocialButton';
import WrongCredentialsError from './WrongCredentialsError';
import LinkTo from './LinkTo';

const styles = (theme) => ({
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

const SignInView = (props) => {
  const {
    classes,
    ip,
    pageURL,
    errorState,
    showSignUp,
    flagEmailError,
    flagUserIDError,
    passwordErrorSignIn,
    flagPasswordError,
    flagCredentialsError,
  } = props;

  let emailAlreadyExistsErr;
  if (errorState === 1) {
    emailAlreadyExistsErr = 'Email already exists!';
  }

  const submitLogin = async (e) => {
    let { target: { userid: { value: userid }, password: { value: password } } } = e;
    userid = userid.trim();
    password = password.trim();
    const remember = state.stayLogged;
    // Is userid a valid email OR username?
    const emailValidationError = !emailValidator.validate(userid);
    const { usernameValidationError } = validateUsername(userid);
    const { passwordValidationError } = validatePassword(password);
    let anyError = false;

    if (emailValidationError && usernameValidationError) {
      flagUserIDError();
      anyError = true;
    } else {
      flagUserIDError(false);
    }
    if (passwordValidationError) {
      flagPasswordError();
      anyError = true;
    } else {
      flagPasswordError(false);
    }
    if (!anyError) {
      // No validation error; proceed to login
      let isLoggedIn = await loginUser(ip, userid, password, remember, pageURL);
      isLoggedIn = typeof isLoggedIn === 'undefined' ? true : isLoggedIn;
      if (!isLoggedIn) {
        // Failed to login
        flagCredentialsError('block');
      }
    }
  };

  const [state, setState] = useState({
    stayLogged: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <>
      <WrongCredentialsError />
      {emailAlreadyExistsErr && (
        <Typography color="error" variant="body1" gutterBottom>
          {emailAlreadyExistsErr}
        </Typography>
      )}
      <form onSubmit={(e) => { e.preventDefault(); submitLogin(e); }}>
        <EmailField
          type="text"
          name="userid"
          placeholder={'"john@doe.com" or "johndoe123"'}
          error={flagEmailError}
          helperText="Your registered email or username"
          label="Email or username"
        />
        <PasswordField name="password" error={passwordErrorSignIn} />
        <FormGroup row>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.stayLogged}
                onChange={handleChange('stayLogged')}
                value="stayLogged"
                inputProps={{
                  'aria-label': 'Keep me logged in',
                }}
              />
            }
            label="Keep me logged in"
          />
        </FormGroup>
        <Typography>
          <LinkTo href="/">Forgot password?</LinkTo>
        </Typography>
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
      <Grid container className={classes.root} spacing={2}>
        <SocialButton pageURL={pageURL} provider="google" />
        <SocialButton pageURL={pageURL} provider="twitter" />
        <SocialButton pageURL={pageURL} provider="facebook" />
      </Grid>
      <span>Don&apos;t have an account?</span>
      <Button color="inherit" onClick={showSignUp}>Sign up</Button>
    </>
  );
};

SignInView.propTypes = {
  flagEmailError: PropTypes.bool.isRequired,
  flagUserIDError: PropTypes.func.isRequired,
  passwordErrorSignIn: PropTypes.bool.isRequired,
  flagPasswordError: PropTypes.func.isRequired,
  flagCredentialsError: PropTypes.func.isRequired,
  errorState: PropTypes.number.isRequired,
  showSignUp: PropTypes.func.isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
    margin: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
  errorState: state.emailWarning,
  flagEmailError: state.flagEmailError,
  passwordErrorSignIn: state.passwordErrorSignIn,
});

const mapDispatchToProps = (dispatch) => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGPASSWORDERROR', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
  flagUserIDError: (errState = true) => {
    dispatch({ type: 'FLAGEMAILERROR', payload: errState });
  },
  flagPasswordError: (errState = true) => {
    dispatch({ type: 'FLAGPASSWORDERROR', payload: errState });
  },
  flagCredentialsError: (errState) => {
    dispatch({ type: 'FLAGCREDENTIALSERROR', payload: errState });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignInView));
