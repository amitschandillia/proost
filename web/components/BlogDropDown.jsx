import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import LanguageIcon from '@material-ui/icons/Language';
import EmailIcon from '@material-ui/icons/Email';
import MenuitemSignOut from './MenuitemSignOut';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
  },
  popoverPaper: {
    width: '90%',
    height: '80%',
    maxHeight: 'unset',
    maxWidth: 'unset',
    // top: `${theme.spacing(6.25)}px !important`,
    left: '5% !important'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

const BlogDropDown = (props) => {
  const {
    classes,
    pageURL,
    blogMenu,
    blogMenuAnchorEl,
    closeBlogDropDown,
  } = props;

  return (
    <Menu
      id="customized-menu"
      className={classes.root}
      anchorEl={blogMenuAnchorEl}
      anchorOrigin={{ vertical: 'bottom' }}
      transformOrigin={{ vertical: 'top' }}
      getContentAnchorEl={null}
      open={blogMenu}
      onClose={closeBlogDropDown}
      PopoverClasses={{paper: props.classes.popoverPaper}}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}><MenuItem>
            <ListItemText primary="Latest Posts" />
          </MenuItem></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
      <MenuItem>
        <ListItemText primary="Latest Posts" />
      </MenuItem>
      <Divider variant="fullWidth" />
      <MenuItem>
        <ListItemText primary="Learn French" />
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

BlogDropDown.propTypes = {
  pageURL: PropTypes.string.isRequired,
  blogMenu: PropTypes.bool.isRequired,
  blogMenuAnchorEl: PropTypes.element.isRequired,
  closeBlogDropDown: PropTypes.func.isRequired,
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
  open: state.openBlogDropDown,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  blogMenu: state.blogMenu,
  blogMenuAnchorEl: state.blogMenuAnchorEl,
});

const mapDispatchToProps = (dispatch) => ({
  closeBlogDropDown: () => {
    dispatch({ type: 'OPENBLOGMENU', payload: false });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BlogDropDown));
