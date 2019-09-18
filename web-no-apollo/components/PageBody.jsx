/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(8),
  },
});

const PageBody = (props) => {
  const {
    classes,
    children,
    nomargin = false,
  } = props;
  return (
    <Grid container className={!nomargin && classes.root}>
      {children}
    </Grid>
  );
};

PageBody.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(PageBody);
