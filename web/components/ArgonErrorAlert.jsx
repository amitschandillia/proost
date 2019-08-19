import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

// export default function ArgonErrorAlert() {
const ArgonErrorAlert = (props) => {

  const {argonError, closeArgonError} = props;

  return (
    <Dialog
      open={argonError}
      onClose={closeArgonError}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Password Error!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          There was an error encrypting your password. Please try again...
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeArgonError} color="primary" autoFocus>
          Try Again
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const mapStateToProps = state => ({
  argonError: state.argonError,
});

const mapDispatchToProps = dispatch => ({
  closeArgonError: (error = true) => { dispatch({ type: 'TOGGLEARGONERROR', payload: false }); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ArgonErrorAlert));
