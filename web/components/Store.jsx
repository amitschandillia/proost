import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import StoreIcon from '@material-ui/icons/Store';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
  storeStyle: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1) /2,
  },
});

const Store = (props) => {
  const {
    classes, userInfo,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Button disableFocusRipple={true} disableRipple={true} color="inherit" className={classes.storeStyle}>
      <StoreIcon />
      Store
    </Button>
  );
};

Store.propTypes = {
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
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Store));
