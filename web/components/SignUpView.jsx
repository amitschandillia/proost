import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import emailValidator from 'email-validator';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import signUpEmail from '../utils/sign-up-email';
import EmailField from './EmailField';
import SocialButton from './SocialButton';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  socials: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
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
  haveAccount: {
    marginLeft: theme.spacing(1),
  },
  submit: {
    width: '100%',
    margin: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px -0.1rem`,
  },
});

const SignUpView = (props) => {
  const {
    classes, pageURL, flagEmailError, emailStatus, emailAlreadyExists, showSignIn, flagError,
  } = props;

  const submitEmail = async (e) => {
    const { target: { to: { value: to } } } = e;
    if (!emailValidator.validate(to)) { flagError(); } else {
      const data = await signUpEmail(to);
      const { verify, signin, ewarn } = data;
      if (verify) emailStatus(verify);
      if (signin) emailAlreadyExists(signin, ewarn);
    }
  };

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); submitEmail(e); }}>
        <EmailField
          name="to"
          error={flagEmailError}
        />
        <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          className={classes.submit}
        >
          Submit
        </Button>
      </form>

      <Grid container className={classes.socials} spacing={2}>
        <SocialButton pageURL={pageURL} provider="google" />
        <SocialButton pageURL={pageURL} provider="twitter" />
        <SocialButton pageURL={pageURL} provider="facebook" />
        <div className={classes.haveAccount}>
          <span>Already have an account?</span>
          <Button color="inherit" onClick={showSignIn}>Sign in</Button>
        </div>
      </Grid>
    </>
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

const mapStateToProps = (state) => ({
  flagEmailError: state.flagEmailError,
});

const mapDispatchToProps = (dispatch) => ({
  showSignIn: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
    dispatch({ type: 'FLAGPASSWORDERROR', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGCREDENTIALSERROR', payload: 'none' });
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
