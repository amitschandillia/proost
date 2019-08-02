import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';
// import { ThemeProvider } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
// import { googleTheme, facebookTheme, twitterTheme } from '../themes/socialsTheme';
import SocialButton from './SocialButton';

// For icons list, refer: https://github.com/FortAwesome/Font-Awesome/tree/1975bba5c4ade236c02bf2e5f9551160ee85109d/js-packages/%40fortawesome
library.add(faFacebookF);
library.add(faGoogle);
library.add(faTwitter);

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

const LoginDialog = (props) => {
  const {
    classes, pageURL,
  } = props;
  // const googleCallback = `/auth/google?callback=${pageURL}`;
  // const twitterCallback = `/auth/twitter?callback=${pageURL}`;
  const logout = `/auth/logout?callback=${pageURL}`;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" href={logout}>
        Logout
      </Button>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>Sign in</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              id="standard-with-placeholder"
              label="Your email"
              placeholder="john@doe.com"
              className={classes.textField}
              margin="normal"
            />
            <TextField
              id="standard-with-placeholder"
              label="Password"
              placeholder="*******"
              className={classes.textField}
              margin="normal"
            />

            <Grid container className={classes.root} spacing={2}>
              <SocialButton pageURL={pageURL} provider="google" />
              <SocialButton pageURL={pageURL} provider="twitter" />
              <SocialButton pageURL={pageURL} provider="facebook" />
            </Grid>
          </DialogContentText>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
};

LoginDialog.propTypes = {
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    signInText: PropTypes.string,
    socialsIcon: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(LoginDialog);
export default connect(state => state)(withStyles(styles)(LoginDialog));
