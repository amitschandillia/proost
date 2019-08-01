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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import { googleTheme, facebookTheme, twitterTheme } from '../themes/socialsTheme';

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
});

const LoginDialog = (props) => {
  const { classes } = props;
  const { pageURL } = props;
  const googleCallback = `/auth/google?callback=${pageURL}`;
  const twitterCallback = `/auth/twitter?callback=${pageURL}`;
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
            <Grid container className={classes.root} spacing={2}>
              <Grid container item direction="column" justify="space-evenly" alignItems="stretch">
                <ThemeProvider theme={googleTheme}>
                  <Button variant="contained" size="large" color="primary" href={googleCallback}>
                    <Grid container>
                      <Grid item xl className={classes.socialsIcon}>
                        <FontAwesomeIcon icon={['fab', 'google']} />
                      </Grid>
                      <Grid item xs className={classes.signInText}>
                        <span>Sign in with Google</span>
                      </Grid>
                    </Grid>
                  </Button>
                </ThemeProvider>
              </Grid>
              <Grid container item direction="column" justify="space-evenly" alignItems="stretch">
                <ThemeProvider theme={facebookTheme}>
                  <Button variant="contained" size="large" color="primary">
                    <Grid container>
                      <Grid item xl className={classes.socialsIcon}>
                        <FontAwesomeIcon icon={['fab', 'facebook-f']} />
                      </Grid>
                      <Grid item xs className={classes.signInText}>
                        <span className={classes.signInText}>Sign in with Facebook</span>
                      </Grid>
                    </Grid>
                  </Button>
                </ThemeProvider>
              </Grid>
              <Grid container item direction="column" justify="space-evenly" alignItems="stretch">
                <ThemeProvider theme={twitterTheme}>
                  <Button variant="contained" size="large" color="primary" href={twitterCallback}>
                    <Grid container>
                      <Grid item xl className={classes.socialsIcon}>
                        <FontAwesomeIcon icon={['fab', 'twitter']} />
                      </Grid>
                      <Grid item xs className={classes.signInText}>
                        <span className={classes.signInText}>Sign in with Twitter</span>
                      </Grid>
                    </Grid>
                  </Button>
                </ThemeProvider>
              </Grid>
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
  }).isRequired,
};

export default withStyles(styles)(LoginDialog);
