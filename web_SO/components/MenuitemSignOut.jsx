import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const MenuitemSignOut = (props) => {
  const { pageURL } = props;
  const logoutRoute = `/auth/logout?callback=${pageURL}`;
  const clickHandler = () => {
    window.location = logoutRoute;
  };

  return (
    <>
      <MenuItem
        onClick={(e) => { e.preventDefault(); clickHandler(); }}
      >
        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
        <ListItemText primary="Sign out" />
      </MenuItem>
    </>
  );
};

MenuitemSignOut.propTypes = {
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(MenuitemSignOut));
