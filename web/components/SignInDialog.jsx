import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SignInView from './SignInView';
import SignUpView from './SignUpView';
import ForgotPasswordView from './ForgotPasswordView';

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
});

const SignInDialog = (props) => {
  const {
    classes,
    pageURL,
    handleClose,
    open,
    showSignInView,
    showSignUpView,
    showForgotPasswordView,
  } = props;

  let dialogTitle;
  if(showSignInView) {
    dialogTitle = 'Sign In';
  } else if(showSignUpView) {
    dialogTitle = 'Sign Up';
  } else if(showForgotPasswordView) {
    dialogTitle = 'Forgot Password';
  }

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        {dialogTitle}
      </DialogTitle>
      {showSignInView && (
      <DialogContent component="div">
        <DialogContentText>
          <SignInView pageURL={pageURL} />
        </DialogContentText>
      </DialogContent>
      )}
      {showSignUpView && (
      <DialogContent component="div">
        <DialogContentText>
          <SignUpView pageURL={pageURL} />
        </DialogContentText>
      </DialogContent>
      )}
      {showForgotPasswordView && (
      <DialogContent component="div">
        <DialogContentText>
          <ForgotPasswordView pageURL={pageURL} />
        </DialogContentText>
      </DialogContent>
      )}
    </Dialog>
  );
};

SignInDialog.propTypes = {
  pageURL: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  showSignInView: PropTypes.bool.isRequired,
  showSignUpView: PropTypes.bool.isRequired,
  showForgotPasswordView: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  open: state.openSignInDialog,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  showForgotPasswordView: state.showForgotPasswordView,
});

const mapDispatchToProps = (dispatch) => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'SHOWFORGOTPASSWORDVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGEPASSWORDERROR', payload: false });
  },
  showForgotPassword: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'SHOWFORGOTPASSWORDVIEW', payload: true });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGEPASSWORDERROR', payload: false });
  },
  showSignIn: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWFORGOTPASSWORDVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
  },
  handleClose: () => {
    dispatch({ type: 'OPENSIGNINDIALOG', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignInDialog));
