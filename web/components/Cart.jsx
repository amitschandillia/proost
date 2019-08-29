import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinkTo from './LinkTo';
import SignInDialog from './SignInDialog';
import SubmitEmailDialog from './SubmitEmailDialog';
import ProfileMenu from './ProfileMenu';
import SearchField from './SearchField';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';

const styles = (theme) => ({
  cartStyle: {
    marginRight: theme.spacing(1) /2,
  },
});

const Cart = (props) => {
  const {
    classes, userInfo, itemsInCart = 0,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Button disableFocusRipple={true} disableRipple={true} color="inherit" className={classes.cartStyle}>
      <Badge badgeContent={itemsInCart} color="error">
        <ShoppingCartIcon />
        Cart
      </Badge>
    </Button>
  );
};

Cart.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    cartStyle: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Cart));
