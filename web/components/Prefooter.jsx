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
import Divider from '@material-ui/core/Divider';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.prefooter.default,
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
  },
  divider: {
    maxWidth: '80%',
    marginBottom: theme.spacing(1),
  },
  gapSameColumn: {
    marginTop: theme.spacing(4),
  },
  gapSmallScreen: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(4),
    },
  },
  gapSmallerScreen: {
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(4),
    },
  },
  adGrid: {
    height: theme.spacing(32),
    alignSelf: 'center',
    border: '1px solid',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
    },
  },
});

const Prefooter = (props) => {
  const {
    classes
  } = props;
  return (
    <Grid container justify="space-between" alignItems="flex-start" className={classes.root}>
      <Grid container lg={9}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="button" component="h2">{process.env.BRAND_NAME}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">About Us</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Press and Media</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Sitemap</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Brand Assets</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Blog</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>Premium</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Membership Plans</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">The Lounge</LinkTo><sup>®</sup></Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallerScreen}>
          <Typography variant="button" component="h2">Resources</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Flashcards</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Placement Test</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Infographics</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Placeholder</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Placeholder</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>Community</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Forums</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Chat</LinkTo></Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallScreen}>
          <Typography variant="button" component="h2">Support</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Support Home</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">FAQs</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Accessibility</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Contact Us</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Placeholder</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Placeholder</LinkTo></Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallScreen}>
          <Typography variant="button" component="h2">Legalese</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Terms of Service</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Privacy Policy</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Disclaimer</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Cookie Policy</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>Guidelines</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">Email Policy</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">Guest Post Policy</LinkTo></Typography>
        </Grid>
      </Grid>
      <Grid container lg={3} className={classes.adGrid} alignItems="center" justify="center">
        {/*Internal advertisement*/}
        {/*If logged in, advertise product*/}
        {/*If not logged in, advertise membership*/}
        Amit
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
