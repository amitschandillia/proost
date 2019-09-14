/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import GradientText from './GradientText';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  container: {
    margin: '0 auto',
    padding: theme.spacing(3, 6, 0, 6),
  },
  avatar: {
    margin: '0 auto;',
    color: '#fff',
    backgroundColor: 'cadetblue',
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  name: {
    marginBottom: theme.spacing(3),
  },
});

const Testimonials = (props) => {
  const {
    classes,
    language,
  } = props;

  return (
    <Box py={20} px={2} className={classes.root}>
      <Avatar className={classes.avatar}>H</Avatar>
      <Grid container justify="center" alignItems="center" xs={11} md={6} lg={4} className={classes.container}>
        <Grid item className={classes.name}>
          <GradientText
            variant="h2"
            angle="diagonal"
            gradientName="jShine"
          >
            John Doe
          </GradientText>
        </Grid>
        <Grid item><Typography variant="body">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec</Typography></Grid>
      </Grid>
    </Box>
  );
};

Testimonials.propTypes = {
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
)(withStyles(styles)(Testimonials));
