/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const bg1 = '/_f/images/home/row1/a.jpg';
const bg2 = '/_f/images/home/row1/b.jpg';
const bg3 = '/_f/images/home/row1/c.jpg';

const styles = (theme) => ({
  root: {
    position: 'relative',
  },
  mediaGray: {
    paddingTop: '100%',
    filter: 'grayscale(1)',
  },
  mediaSepia: {
    paddingTop: '100%',
    filter: 'sepia(1)',
  },
  filter: {
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
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    textAlign: 'center',
  },
});

const ThreePicsItem = (props) => {
  const {
    classes, picture, filter = 'grayscale',  children,
  } = props;
  let mediaClass;
  if(filter === 'grayscale') { mediaClass = classes.mediaGray; }
  if(filter === 'sepia') { mediaClass = classes.mediaSepia; }
  return (
    <Grid item xs={12} sm={4} className={classes.root}>
      <CardMedia
        className={mediaClass}
        image={picture}
        title="Paella dish"
      />
    <Grid container alignItems="center" justify="center" className={classes.filter}>{children}</Grid>
    </Grid>
  );
};

ThreePicsItem.propTypes = {
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
)(withStyles(styles)(ThreePicsItem));
