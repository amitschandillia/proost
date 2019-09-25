/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import LinkTo from './LinkTo';
import GradientText from './GradientText';
import Typography from '@material-ui/core/Typography';

import NameIcon from './svg-icons/NameIcon';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
    color: theme.palette.grey[600],
  },
  icon: {
    fontSize: theme.spacing(10),
  },
  h4: {
    fontWeight: theme.typography.fontWeightLight,
  },
  h5: {
    margin: theme.spacing(1, 4),
    fontWeight: theme.typography.fontWeightLight,
  },
  gradient: {
    fontWeight: theme.typography.fontWeightLight,
    paddingBottom: theme.spacing(2),
  },
});

const WhitespaceItem2 = (props) => {
  const {
    classes,
    language,
  } = props;
  return (
    <Grid
      item xs={12}
      sm={6}
      lg={4}
      className={classes.root}
    >
      <NameIcon size={10} gradientName="jShine" angle="diagonal" className={classes.icon} />
      <GradientText
        variant="h4"
        className={classes.gradient}
        angle="diagonal"
        gradientName="jShine"
      >
        Loremipsum
      </GradientText>
      <Typography
        variant="h5"
        className={classes.h5}
        component="p"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      </Typography>
    </Grid>
  );
};

WhitespaceItem2.propTypes = {
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
)(withStyles(styles)(WhitespaceItem2));
