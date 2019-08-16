import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SocialButton from './SocialButton';
import EmailField from './EmailField';
import PasswordField from './PasswordField';
// import isEmailValid from '../utils/validateEmail';

import emailValidator from 'email-validator';


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
  const { classes, pageURL, flagEmailError } = props;

  const submitEmail = (e) => {
    const emailVal = e.target['to'].value;
    if(!emailValidator.validate(emailVal)) {
      props.flagError();
      e.preventDefault();
    }
  };

  return (
    <Fragment>
      <form action="/mail" method="POST" onSubmit={(e) => {submitEmail(e)}}>
        <EmailField
          name="to"
          error={flagEmailError}
        />
        <input type="hidden" name="pageURL" value={pageURL} />
      </form>


      <Grid container className={classes.root} spacing={2}>
        <SocialButton pageURL={pageURL} provider="google" />
        <SocialButton pageURL={pageURL} provider="twitter" />
        <SocialButton pageURL={pageURL} provider="facebook" />
      </Grid>
      <span>Already have an account?</span>
      <Button color="inherit" onClick={props.showSignIn}>Sign in</Button>
    </Fragment>
  );
};

SignUpView.propTypes = {
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignUpView));
