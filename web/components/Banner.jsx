import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinkTo from './LinkTo';

const bg = 'https://media.geeksforgeeks.org/wp-content/uploads/Screen-Shot-2017-11-13-at-10.23.39-AM.png';

const styles = theme => ({
  root: {
    color: 'white',
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center', // vertical alignment
    justifyContent: 'center', // horizontal alignment
    position: 'relative',
    zIndex: 0,
    '&:after': {
      content: `''`,
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      background: 'black',
      background: `-moz-linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)`,
      background: `-webkit-linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)`,
      background: `linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)`,
      filter: `progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1)`,
      zIndex: -1,
    },
  },
});

const Banner = (props) => {
  const {
    classes, pageURL, userInfo, children
  } = props;

  return (
    <Fragment>
      <div className={classes.root}>{children}</div>
    </Fragment>
  );
};

Banner.propTypes = {
  sessID: PropTypes.string.isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  // userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  handleClickOpen: () => {
    // dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Banner));
