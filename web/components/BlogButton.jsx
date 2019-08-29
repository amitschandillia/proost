import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';
import BlogDropDown from './BlogDropDown';

const styles = (theme) => ({
  blogButtonStyle: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1) / 2,
  },
});

const BlogButton = (props) => {
  const {
    classes, pageURL, userInfo, blogMenu, openBlogMenu,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <>
      <Button
        disableFocusRipple={true}
        disableRipple={true}
        color="inherit"
        onClick={openBlogMenu}
        className={classes.blogButtonStyle}>
        <LibraryBooksIcon
      />
        Blog
        {!blogMenu && <KeyboardArrowDownIcon />}
        {blogMenu && <KeyboardArrowUpIcon />}
      </Button>
      <BlogDropDown pageURL={pageURL} />
    </>
  );
};

BlogButton.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    transparentAppBar: PropTypes.string,
    overlay: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  blogMenu: state.blogMenu,
});

const mapDispatchToProps = (dispatch) => ({
  openBlogMenu: (e) => {
    dispatch({ type: 'OPENBLOGMENU', payload: Boolean(e.currentTarget) });
    dispatch({ type: 'CHANGEBLOGMENUANCHOREL', payload: e.currentTarget });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(BlogButton));
