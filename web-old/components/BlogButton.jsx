import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import BlogDropDown from './BlogDropDown';

const styles = (theme) => ({
  root: {
    verticalAlign: 'middle',
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
});

const BlogButton = (props) => {
  const {
    classes, pageURL, userInfo, blogMenu, openBlogMenu, language,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <>
      <Button
        disableFocusRipple
        disableRipple
        color="inherit"
        onClick={openBlogMenu}
        className={classes.root}
      >
        <LibraryBooksIcon className={classes.icon} />
        {language.lexicon.blog}
        {!blogMenu && <KeyboardArrowDownIcon />}
        {blogMenu && <KeyboardArrowUpIcon />}
      </Button>
      <BlogDropDown pageURL={pageURL} />
    </>
  );
};

BlogButton.propTypes = {
  pageURL: PropTypes.string.isRequired,
  blogMenu: PropTypes.bool.isRequired,
  openBlogMenu: PropTypes.func.isRequired,
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
  language: state.language,
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
