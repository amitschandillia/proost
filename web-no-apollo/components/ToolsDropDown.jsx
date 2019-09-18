import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
});

const ToolsDropDown = (props) => {
  const {
    classes,
    toolsMenu,
    toolsMenuAnchorEl,
    closeToolsDropDown,
  } = props;

  return (
    <Menu
      id="customized-menu"
      className={classes.root}
      anchorEl={toolsMenuAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={toolsMenu}
      onClose={closeToolsDropDown}
    >
      <MenuItem>
        <ListItemText primary="Latest Posts" />
      </MenuItem>
      <Divider variant="fullWidth" />
      <MenuItem>
        <ListItemText primary="Learn Nothing!" />
      </MenuItem>
      <MenuItem>
        <ListItemText primary="Learn Latin" />
      </MenuItem>
      <MenuItem>
        <ListItemText primary="Learn Italian" />
      </MenuItem>
    </Menu>
  );
};

ToolsDropDown.propTypes = {
  toolsMenu: PropTypes.bool.isRequired,
  toolsMenuAnchorEl: PropTypes.element.isRequired,
  closeToolsDropDown: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  open: state.openToolsDropDown,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  toolsMenu: state.toolsMenu,
  toolsMenuAnchorEl: state.toolsMenuAnchorEl,
});

const mapDispatchToProps = (dispatch) => ({
  closeToolsDropDown: () => {
    dispatch({ type: 'OPENTOOLSMENU', payload: false });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ToolsDropDown));
