/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import LinkTo from './LinkTo';
import VerticalDivider from './VerticalDivider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
  },
  copyright: {
    display: 'flex',
  },
  footerLogo: {
    marginRight: theme.spacing(1),
  },
  footerLinks: {
    textAlign: 'right',
  },
});

const Footer = (props) => {
  const {
    classes, ip
  } = props;

  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={6} alignItems="center" className={classes.copyright}>
        <img className={classes.footerLogo} src="_f/images/desktop-header-logo.png" width="48" height="48" />
        &copy;
        {` 2015-${new Date().getFullYear()}`}
        {` ${process.env.COPYRIGHT_ENTITY}. All Rights Reserved.`}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid className={classes.footerLinks} container justify="flex-end" alignItems="center">
          <LinkTo hoverDotted href="/">Terms</LinkTo>
          <VerticalDivider />
          <LinkTo hoverDotted href="/">Privacy</LinkTo>
          <VerticalDivider />
          <LinkTo hoverDotted href="/">About</LinkTo>
          <VerticalDivider />
          <LinkTo hoverDotted href="/">{ip}</LinkTo>
        </Grid>
      </Grid>
    </Grid>
  );
};

Footer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Footer));
