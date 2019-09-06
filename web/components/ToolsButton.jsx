import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import BuildIcon from '@material-ui/icons/Build';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ToolsDropDown from './ToolsDropDown';

const styles = (theme) => ({
  root: {
    verticalAlign: 'middle',
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
});

const ToolsButton = (props) => {
  const {
    classes, pageURL, userInfo, toolsMenu, openToolsMenu,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <>
      <Button
        disableFocusRipple
        disableRipple
        color="inherit"
        onClick={openToolsMenu}
        className={classes.root}
      >
        <BuildIcon className={classes.icon} />
        Tools
        {!toolsMenu && <KeyboardArrowDownIcon />}
        {toolsMenu && <KeyboardArrowUpIcon />}
      </Button>
      <ToolsDropDown pageURL={pageURL} />
    </>
  );
};

ToolsButton.propTypes = {
  pageURL: PropTypes.string.isRequired,
  toolsMenu: PropTypes.bool.isRequired,
  openToolsMenu: PropTypes.func.isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    transparentAppBar: PropTypes.string,
    overlay: PropTypes.string,
    title: PropTypes.string,
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  toolsMenu: state.toolsMenu,
});

const mapDispatchToProps = (dispatch) => ({
  openToolsMenu: (e) => {
    dispatch({ type: 'OPENTOOLSMENU', payload: Boolean(e.currentTarget) });
    dispatch({ type: 'CHANGETOOLSMENUANCHOREL', payload: e.currentTarget });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ToolsButton));
