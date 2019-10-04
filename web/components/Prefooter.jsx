/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import LinkTo from '../components/LinkTo';
import PrefooterAdverts from './PrefooterAdverts';

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
});

const Prefooter = (props) => {
  const {
    classes,
    language,
  } = props;
  return (
    <Grid container justify="space-between" alignItems="flex-start" className={classes.root}>
      <Grid container lg={9}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="button" component="h2">{process.env.BRAND_NAME}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.aboutUs}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.pressAndMedia}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.sitemap}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/blog/categories">{language.lexicon.brandAssets}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/blog">{language.lexicon.blog}</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>{language.lexicon.premium}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.membershipPlans}</LinkTo></Typography>
          <Typography>
            <LinkTo hoverNone href="/about">{language.lexicon.theLounge}</LinkTo>
            <sup>®</sup>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallerScreen}>
          <Typography variant="button" component="h2">{language.lexicon.resources}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.flashcards}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.placementTest}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.infographics}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.placeholder}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.placeholder}</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>{language.lexicon.community}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.forums}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.chat}</LinkTo></Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallScreen}>
          <Typography variant="button" component="h2">{language.lexicon.support}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.supportHome}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.faqs}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.accessibility}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.contactUs}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.placeholder}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.placeholder}</LinkTo></Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.gapSmallScreen}>
          <Typography variant="button" component="h2">{language.lexicon.legalese}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.termsOfService}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.privacyPolicy}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.disclaimer}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.cookiePolicy}</LinkTo></Typography>
          <Typography variant="button" component="h2" className={classes.gapSameColumn}>{language.lexicon.guidelines}</Typography>
          <Divider className={classes.divider} />
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.emailPolicy}</LinkTo></Typography>
          <Typography><LinkTo hoverNone href="/about">{language.lexicon.guestPostPolicy}</LinkTo></Typography>
        </Grid>
      </Grid>
      <PrefooterAdverts />
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

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Prefooter));
