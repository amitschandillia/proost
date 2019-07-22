import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = () => ({
  googleColor: {
    backgroundColor: process.env.GOOGLE_COLOR,
  },
});

const LoginDialog = (props) => {
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">LOGIN/REGISTER</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Join us for a more customized experience and unrestricted access to all resources.
            <Button className={classes.googleColor}>
              <img alt="Google" src={process.env.GOOGLE_ICON} />
            </Button>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

LoginDialog.propTypes = {
  classes: PropTypes.shape({
    googleColor: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(LoginDialog);
