import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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

const SubmitEmailDialog = (props) => {
  const {
    classes,
    handleClose,
    openSubmitEmailDialog,
  } = props;

  const dialogTitle = 'Email sent?';

  return (
    <Dialog
      maxWidth="xs"
      open={openSubmitEmailDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>
        {dialogTitle}
      </DialogTitle>
      <DialogContent component="div">
        <DialogContentText>
          {openSubmitEmailDialog === 2 ? (
            <h1>Email sent successfully!</h1>
          ) : (
            <h1>Email could not be sent!</h1>
          )}
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

SubmitEmailDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  openSubmitEmailDialog: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  openSubmitEmailDialog: state.openSubmitEmailDialog,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch({ type: 'OPENSUBMITEMAILDIALOG', payload: 0 });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SubmitEmailDialog));
