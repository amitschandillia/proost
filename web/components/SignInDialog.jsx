import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import SignInView from './SignInView';
import SignUpView from './SignUpView';

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

const SignInDialog = (props) => {
  const {
    classes, pageURL, handleClose, open,
  } = props;

  const dialogTitle = props.showSignInView ? 'Sign in' : 'Sign up';

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{dialogTitle}</DialogTitle>
      {props.showSignInView && (
      <DialogContent component="div">
        <DialogContentText>
          <SignInView pageURL={pageURL} />
        </DialogContentText>
      </DialogContent>
      )}
      {props.showSignUpView && (
      <DialogContent component="div">
        <DialogContentText>
          <SignUpView pageURL={pageURL} />
        </DialogContentText>
      </DialogContent>
      )}
    </Dialog>
  );
};

SignInDialog.propTypes = {
  pageURL: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  open: state.openSignInDialog,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
});

const mapDispatchToProps = dispatch => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
  },
  showSignIn: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
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