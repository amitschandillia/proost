/* eslint-disable no-unused-vars */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { useState } from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import Dialog from '@material-ui/core/Dialog';

import Button from '@material-ui/core/Button';

import axios from 'axios';

const styles = (theme) => ({
  root: {},
});

const FlagsDialog = (props) => {
  const {
    classes,
    handleClose,
    showFlagsDialog,
    setLanguage,
    language,
  } = props;

  const selectLang = async (evt) => {
    const selectedLanguage = evt.currentTarget.name;
    const res = await axios.post('/languageSelection', { selectedLanguage });
    setLanguage(res.data);
    handleClose();
  };

  return (
    <Dialog
      open={showFlagsDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Button onClick={selectLang} name="en">English</Button>
      <Button onClick={selectLang} name="es">Spanish</Button>
      <Button onClick={selectLang} name="fr">French</Button>
      <Button onClick={selectLang} name="de">German</Button>
    </Dialog>
  );
};

FlagsDialog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
  language: state.language,
  showFlagsDialog: state.showFlagsDialog,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => {
    dispatch({ type: 'SHOWFLAGSDIALOG', payload: false });
  },
  setLanguage: (dictionary) => {
    dispatch({ type: 'SETLANGUAGE', payload: dictionary });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FlagsDialog));
