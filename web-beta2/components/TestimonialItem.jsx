/* eslint no-dupe-keys: 0 */

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import GradientText from './GradientText';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  container: {
    margin: '0 auto',
    paddingTop: theme.spacing(3),
  },
  avatarContainer: {
    marginBottom: theme.spacing(2),
  },
  avatar: {
    color: '#fff',
    backgroundColor: 'cadetblue',
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  nameItem: {
    textAlign: 'center',
  },
  name: {
    fontWeight: theme.typography.fontWeightLight,
  },
  testimonial: {
    fontSize: theme.spacing(2.5),
    color: theme.palette.grey[600],
  },
  quote: {
    transform: 'rotate(180deg)',
    fontSize: theme.spacing(8),
    color: theme.palette.grey[600],
    marginBottom: theme.spacing(-2),
  },
});

const TestimonialItem = (props) => {
  const {
    classes,
    language,
    name,
    blurb,
  } = props;

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <Grid item className={classes.avatarContainer}>
        <Avatar className={classes.avatar}>H</Avatar>
      </Grid>
      <Grid item className={classes.nameItem}>
        <GradientText
          variant="h4"
          angle="diagonal"
          gradientName="jShine"
          className={classes.name}
        >
          {name}
        </GradientText>
      </Grid>
      <Grid item>
        <FormatQuoteIcon className={classes.quote} />
      </Grid>
      <Grid item>
        <Typography
          variant="body"
          className={classes.testimonial}
          component="p"
        >
          {blurb}
        </Typography>
      </Grid>
    </Grid>
  );
};

TestimonialItem.propTypes = {
  name: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(TestimonialItem));
