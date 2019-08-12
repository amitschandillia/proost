import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import SocialButton from './SocialButton';
import EmailField from './EmailField';
import PasswordField from './PasswordField';

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

const SignInView = (props) => {
  const { classes, pageURL, errorState } = props;

  let emailAlreadyExistsErr ;
  if(errorState == 1) {
    emailAlreadyExistsErr = 'Email already exists!';
  }

  return (
    <Fragment>
      {emailAlreadyExistsErr && (
        <Typography color="error" variant="body1" gutterBottom>
          {emailAlreadyExistsErr}
        </Typography>
      )}
      <EmailField />
      <PasswordField />
      <Grid container className={classes.root} spacing={2}>
        <SocialButton pageURL={pageURL} provider="google" />
        <SocialButton pageURL={pageURL} provider="twitter" />
        <SocialButton pageURL={pageURL} provider="facebook" />
      </Grid>
      <span>Don't have an account?</span>
      <Button color="inherit" onClick={props.showSignUp}>Sign up</Button>
    </Fragment>
  );
};

SignInView.propTypes = {
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};





const mapStateToProps = state => ({
  errorState: state.emailWarning,
});

const mapDispatchToProps = dispatch => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
});





export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SignInView));










// export default connect(state => state)(withStyles(styles)(SignInView));
