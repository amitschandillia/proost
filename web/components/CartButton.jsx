import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  cartStyle: {
    marginRight: theme.spacing(1) / 2,
  },
});

const CartButton = (props) => {
  const {
    classes,
    userInfo,
    itemsInCart = 0,
  } = props;

  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Button disableFocusRipple disableRipple color="inherit" className={classes.cartStyle}>
      <Badge badgeContent={itemsInCart} color="error">
        <ShoppingCartIcon />
        Cart
      </Badge>
    </Button>
  );
};

CartButton.propTypes = {
  itemsInCart: PropTypes.number.isRequired,
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
)(withStyles(styles)(CartButton));
