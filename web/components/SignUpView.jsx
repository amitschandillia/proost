import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import emailValidator from 'email-validator';
import SocialButton from './SocialButton';
import EmailField from './EmailField';
import signUpEmail from '../utils/signUpEmail';

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
});

const SignUpView = (props) => {
  const {
    classes, pageURL, flagEmailError, emailStatus, emailAlreadyExists, showSignIn, flagError,
  } = props;

  const submitEmail = async (e) => {
    const emailVal = e.target.to.value;
    if (!emailValidator.validate(emailVal)) { flagError(); } else {
      const data = await signUpEmail(emailVal);
      const { verify, signin, ewarn } = data;
      if (verify) emailStatus(verify);
      if (signin) emailAlreadyExists(signin, ewarn);
    }
  };

  return (
    <Fragment>
      <form onSubmit={(e) => { e.preventDefault(); submitEmail(e); }}>
        <EmailField
          name="to"
          error={flagEmailError}
        />
      </form>

      <Grid container className={classes.root} spacing={2}>
        <SocialButton pageURL={pageURL} provider="google" />
        <SocialButton pageURL={pageURL} provider="twitter" />
        <SocialButton pageURL={pageURL} provider="facebook" />
      </Grid>
      <span>Already have an account?</span>
      <Button color="inherit" onClick={showSignIn}>Sign in</Button>
    </Fragment>
  );
};

SignUpView.propTypes = {
  flagEmailError: PropTypes.bool.isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
  emailStatus: PropTypes.func.isRequired,
  emailAlreadyExists: PropTypes.func.isRequired,
  showSignIn: PropTypes.func.isRequired,
  flagError: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  flagEmailError: state.flagEmailError,
});

const mapDispatchToProps = dispatch => ({
  showSignIn: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
  },
  flagError: () => {
    dispatch({ type: 'FLAGEMAILERROR', payload: true });
  },
  emailStatus: (verify) => {
    dispatch({ type: 'OPENSIGNINDIALOG', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
    dispatch({ type: 'OPENSUBMITEMAILDIALOG', payload: verify });
  },
  emailAlreadyExists: (signin, ewarn) => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: !signin });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: signin });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: ewarn });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignUpView));
