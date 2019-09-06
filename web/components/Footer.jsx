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
  footerLinks: {
    textAlign: 'right',
  },
});

const Footer = (props) => {
  const {
    classes
  } = props;
  return (
    <Grid container alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={6}>
        &copy;
        {` 2015-${new Date().getFullYear()}`}
        {` ${process.env.BRAND_NAME}. All Rights Reserved.`}
      </Grid>
      <Grid item xs={12} sm={6}>
        <Grid className={classes.footerLinks} container justify="flex-end" alignItems="center">
          <LinkTo href="/">Terms</LinkTo>
          <VerticalDivider />
          <LinkTo href="/">Privacy</LinkTo>
          <VerticalDivider />
          <LinkTo href="/">About</LinkTo>
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

export default connect((state) => state)(withStyles(styles)(Footer));
