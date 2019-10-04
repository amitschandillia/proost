/* eslint no-dupe-keys: 0 */

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TestimonialItem from './TestimonialItem';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  testimonial: {
    border: '1px solid #bdbdbd',
  },
  first: {
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    [theme.breakpoints.down('md')]: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
  },
  second: {
    [theme.breakpoints.up('lg')]: {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    [theme.breakpoints.down('md')]: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
  },
  third: {
    [theme.breakpoints.up('sm')]: {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
    },
    [theme.breakpoints.down('xs')]: {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
    },
  },
  fourth: {},
});

const Testimonials = (props) => {
  const {
    classes,
    language,
  } = props;

  return (
    <Grid container justify="space-around" direction="row">
      <Grid item xs={12} sm={6} lg={3} className={`${classes.root} ${classes.first}`}>
        <TestimonialItem
          name="John Doe"
          blurb="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec"
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} className={`${classes.root} ${classes.second}`}>
        <TestimonialItem
          name="Arnold Schwarzenegger"
          blurb="Lorem ipsum dolor sit amet."
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} className={`${classes.root} ${classes.third}`}>
        <TestimonialItem
          name="Bob Hope"
          blurb="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor."
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={3} className={`${classes.root} ${classes.fourth}`}>
        <TestimonialItem
          name="Brenda Clum"
          blurb="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus."
        />
      </Grid>
    </Grid>
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
