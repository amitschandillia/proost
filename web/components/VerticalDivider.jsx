/* eslint-disable no-unused-vars */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import iconsTheme from '../themes/icons-theme';

const styles = (theme) => ({
  root: {
    color: iconsTheme.palette.primary.main,
    flexGrow: 0.1,
    textAlign: 'center',
  },
});

const VerticalDivider = (props) => {
  const {
    classes
  } = props;
  return (
    <>
      <span className={classes.root}>{`|`}</span>
    </>
  );
};

VerticalDivider.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(VerticalDivider);
