import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import MenuPosts from './blog/MenuPosts';
import MenuAuthors from './blog/MenuAuthors';
import MenuCategories from './blog/MenuCategories';
import MenuTags from './blog/MenuTags';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  popoverPaper: {
    width: '90%',
    height: 'max-content',
    maxHeight: 'unset',
    left: '5% !important',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    border: '1px solid lightgray',
  },
  container: {
    width: 'auto',
    margin: 'auto',
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
      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <MenuPosts />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <MenuAuthors />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <MenuCategories />
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <MenuTags />
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
    container: PropTypes.string,
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
