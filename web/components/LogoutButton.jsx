import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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

const LogoutButton = (props) => {
  const { pageURL } = props;

  const logoutRoute = `/auth/logout?callback=${pageURL}`;

  const clickHandler = () => {
    window.location = logoutRoute;
  };

  return (
    <Fragment>
      <Button
        color="inherit"
        onClick={(e) => { e.preventDefault(); clickHandler(); }}
      >
        Logout
      </Button>
    </Fragment>
  );
};

LogoutButton.propTypes = {
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

// const mapDispatchToProps = dispatch => ({
//   handleClickOpen: () => {
//     dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
//   },
// });

export default connect(
  null,
  null,
)(withStyles(styles)(LogoutButton));
