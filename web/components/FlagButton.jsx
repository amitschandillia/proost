/* eslint-disable no-unused-vars */

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import FlagsDialog from './FlagsDialog';

const styles = (theme) => ({
  root: {
    padding: 0,
  },
});

const FlagButton = (props) => {
  const {
    classes,
    ip,
    clickOpen,
    showFlagsDialog,
    language,
  } = props;

  const Flag = require(`./svg-icons/flags/${language.flag}`).default;

  const handleClickOpen = () => {
    clickOpen();
  };

  return (
    <>
      <Tooltip title={language.languageName} aria-label={language.languageName}>
        <IconButton disableFocusRipple disableRipple className={classes.root} onClick={handleClickOpen}>
          <Flag />
        </IconButton>
      </Tooltip>
      <FlagsDialog />
    </>
  );
};

FlagButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
  showFlagsDialog: state.showFlagsDialog,
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  clickOpen: () => {
    dispatch({ type: 'SHOWFLAGSDIALOG', payload: true });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(FlagButton));
