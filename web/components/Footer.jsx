/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import LinkTo from '../components/LinkTo';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

const Footer = (props) => {
  const {
    classes
  } = props;
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        &copy;
        {` 2015-${new Date().getFullYear()}`}
        {` ${process.env.BRAND_NAME}. All Rights Reserved.`}
      </Grid>
      <Grid item xs={12} sm={6}>
        Other links
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
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

export default connect((state) => state)(withStyles(styles)(Footer));
