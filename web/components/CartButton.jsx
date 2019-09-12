import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
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

const CartButton = (props) => {
  const {
    classes,
    userInfo,
    itemsInCart = 0,
    language,
  } = props;

  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Button
      disableFocusRipple
      disableRipple
      color="inherit"
      className={classes.root}
    >
      <Badge badgeContent={itemsInCart} color="error">
        <ShoppingCartIcon className={classes.icon} />
        {language.lexicon.cart}
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
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(CartButton));
