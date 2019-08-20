import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import emailValidator from 'email-validator';
import SocialButton from './SocialButton';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
import {validateUsername} from '../utils/validateRegistrationData';

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

const SignInView = (props) => {
  const {
    classes, pageURL, errorState, showSignUp, flagEmailError, flagUserIDError,
  } = props;

  let emailAlreadyExistsErr;
  if (errorState === 1) {
    emailAlreadyExistsErr = 'Email already exists!';
  }

  const submitLogin = async (e) => {
    // const userid = e.target.userid.value;
    // const password = e.target.password.value;
    let { target: { userid: { value: userid }, password: { value: password } } } = e;
    userid = userid.trim();
    password = password.trim();
    // if (!emailValidator.validate(userid)) { flagUserIDError(); } else {}

    // Is userid a valid email OR username?
    const emailValidationError = !emailValidator.validate(userid);
    const { usernameValidationText, usernameValidationError } = validateUsername(userid);
    if (emailValidationError && usernameValidationError) {
      flagUserIDError();
    } else {
      // userid IS valid.
      console.log('NO MISTAKE!');
      flagUserIDError(false);
    }
  };

  return (
    <Fragment>
      {emailAlreadyExistsErr && (
        <Typography color="error" variant="body1" gutterBottom>
          {emailAlreadyExistsErr}
        </Typography>
      )}
      <form onSubmit={(e) => { e.preventDefault(); submitLogin(e); }}>
        <EmailField
          type="text"
          name="userid"
          placeholder={`"john@doe.com" or "johndoe123"`}
          error={flagEmailError}
          helperText="Your registered email or username"
        />
        <PasswordField name="password" />
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
    </Fragment>
  );
};

SignInView.propTypes = {
  errorState: PropTypes.number.isRequired,
  showSignUp: PropTypes.func.isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  errorState: state.emailWarning,
  flagEmailError: state.flagEmailError,
});

const mapDispatchToProps = dispatch => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
  flagUserIDError: (errState = true) => {
    dispatch({ type: 'FLAGEMAILERROR', payload: errState });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignInView));
