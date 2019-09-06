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
    backgroundColor: theme.palette.prefooter.default,
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
});

const Prefooter = (props) => {
  const {
    classes
  } = props;
  return (
    <Grid container justify="space-between" alignItems="center" className={classes.root}>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Some links go here</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Some links go here</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Some links go here</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Typography>Some links go here</Typography>
      </Grid>
    </Grid>
  );
};

Prefooter.propTypes = {
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

export default connect((state) => state)(withStyles(styles)(Prefooter));
