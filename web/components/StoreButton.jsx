import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import StoreIcon from '@material-ui/icons/Store';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    verticalAlign: 'middle',
  },
  icon: {
    marginRight: theme.spacing(0.5),
  },
});

const StoreButton = (props) => {
  const {
    classes, userInfo,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Button disableFocusRipple disableRipple color="inherit" className={classes.root}>
      <StoreIcon className={classes.icon} />
      Store
    </Button>
  );
};

StoreButton.propTypes = {
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
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(StoreButton));
