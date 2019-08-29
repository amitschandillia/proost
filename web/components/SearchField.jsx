import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { fade } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

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
    classes, className,
  } = props;

  return (
    <form className={className}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'Search' }}
        />
      </div>
    </form>
  );
};

SearchField.propTypes = {
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

export default connect(
  null,
  null,
)(withStyles(styles)(SearchField));
