/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    height: '100vh',
    width: '100%',
    // display: 'flex',
    paddingTop: '20%',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '50%',
    },
    paddingLeft: theme.typography.htmlFontSize,
    paddingRight: theme.typography.htmlFontSize,
    alignItems: 'center', // vertical alignment
    justifyContent: 'center', // horizontal alignment
    position: 'relative',
    zIndex: 0,
    '&:after': {
      content: '\'\'',
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      background: theme.palette.common.black,
      background: '-moz-linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)',
      background: '-webkit-linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)',
      background: 'linear-gradient(180deg, rgba(0,0,0,.7) 0%, rgba(0,0,0, .6) 10%, rgba(0,0,0,.4) 100%)',
      filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#000000",endColorstr="#000000",GradientType=1)',
      zIndex: -1,
    },
  },
});

const Banner = (props) => {
  const {
    classes,
    children,
    image,
  } = props;

  return (
    <div className={classes.root} style={{backgroundImage: `url(${image})`}}>{children}</div>
  );
};

Banner.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(Banner));
