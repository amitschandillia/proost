import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
  },
  popoverPaper: {
    width: '90%',
    height: '80%',
    maxHeight: 'unset',
    left: '5% !important',
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
      PopoverClasses={{ paper: classes.popoverPaper }}
    >
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Latest Posts
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Authors
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Categories
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Tags
          </Paper>
        </Grid>
      </Grid>
    </Menu>
  );
};

BlogDropDown.propTypes = {
  blogMenu: PropTypes.bool.isRequired,
  blogMenuAnchorEl: PropTypes.element.isRequired,
  closeBlogDropDown: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
    paper: PropTypes.string,
    popoverPaper: PropTypes.string,
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
