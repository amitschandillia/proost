/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LinkTo from './LinkTo';
import Typography from '@material-ui/core/Typography';

import WhitespaceItem1 from './WhitespaceItem1';

const styles = (theme) => ({
  root: {
    // paddingTop: theme.typography.htmlFontSize * 3,
    // paddingBottom: theme.typography.htmlFontSize * 3,
  },
});

const WhitespaceGrid = (props) => {
  const {
    classes,
    language,
  } = props;
  return (
    <Grid
      container
      justify="space-around"
      alignItems="center"
      className={classes.root}
    >
      <WhitespaceItem1 />
      <WhitespaceItem1 />
      <WhitespaceItem1 />
      <WhitespaceItem1 />
      <WhitespaceItem1 />
      <WhitespaceItem1 />
    </Grid>
  );
};

WhitespaceGrid.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(WhitespaceGrid));
