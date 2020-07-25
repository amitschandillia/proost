import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    transition: theme.transitions.create(
      ['all'],
      { duration: theme.transitions.duration.complex },
    ),
    borderRadius: 4,
    color: 'inherit',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.5),
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

const SearchField = (props) => {
  const {
    classes, className, language,
  } = props;

  return (
    <form className={className} action="/blog">
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder={`${language.lexicon.search}...`}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'Search', 'name': 'search' }}
        />
      </div>
    </form>
  );
};

SearchField.propTypes = {
  className: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    inputRoot: PropTypes.string,
    inputInput: PropTypes.string,
    search: PropTypes.string,
    searchIcon: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(SearchField));
