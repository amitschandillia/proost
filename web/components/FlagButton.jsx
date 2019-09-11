/* eslint-disable no-unused-vars */

import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const styles = (theme) => ({
  root: {
    padding: 0,
  },
});

const FlagButton = (props) => {
  const {
    lang, classes, ip
  } = props;

  let Flag, languageName;

  if(lang === 'english') {
    Flag = require('./svg-icons/flags/UnitedStates').default;
  } else if(lang === 'spanish') {
    Flag = require('./svg-icons/flags/Mexico').default;
  }

  switch(lang) {
    case 'english':
      Flag = require('./svg-icons/flags/UnitedStates').default;
      languageName = 'English';
      break;
    case 'spanish':
      Flag = require('./svg-icons/flags/Spain').default;
      languageName = 'Spanish';
      break;
    case 'french':
      Flag = require('./svg-icons/flags/France').default;
      languageName = 'French';
      break;
    case 'german':
      Flag = require('./svg-icons/flags/Germany').default;
      languageName = 'German';
      break;
    default:
      Flag = require('./svg-icons/flags/UnitedStates').default;
      languageName = 'English';
      break;
  }

  return (
    <Tooltip title={languageName} aria-label={languageName}>
      <IconButton disableFocusRipple disableRipple className={classes.root}>
        <Flag />
      </IconButton>
    </Tooltip>
  );
};

FlagButton.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(FlagButton));
