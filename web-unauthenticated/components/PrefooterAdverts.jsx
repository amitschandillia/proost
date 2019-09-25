/* eslint-disable no-unused-vars */

import './FontAwesomeLibrary';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import {
  facebookTheme,
  twitterTheme,
  appleTheme,
  androidTheme,
} from '../themes/brand-themes';

import Hidden from '@material-ui/core/Hidden';
import LinkTo from './LinkTo';

const styles = (theme) => ({
  root: {
    height: theme.spacing(32),
    alignSelf: 'center',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(2),
      borderLeft: 'none',
      borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    },
  },
  adMessageContainer: {
    textAlign: 'center',
  },
  adMessage: {
    fontWeight: 300,
  },
  appContainerItem: {
    width: '70%',
  },
  separator: {
    height: theme.spacing(20),
    margin: `0 ${theme.spacing(10)}px`,
    borderLeft: `1px solid ${theme.palette.grey[400]}`,
  },
  iconsContainer: {
    marginTop: theme.spacing(3),
  },
  iconButton: {
    // background: 'rgba(0, 0, 0, 0.08)',
  },
  appIcon: {
    height: `${theme.spacing(6)}px !important`,
    width: `${theme.spacing(6)}px !important`,
    filter: `drop-shadow(1px 1px 1px gray)`,
  },
  apple: {
    color: appleTheme.palette.primary.main,
  },
  android: {
    color: androidTheme.palette.primary.main,
  },
  facebook: {
    color: facebookTheme.palette.primary.main,
  },
  twitter: {
    color: twitterTheme.palette.primary.main,
  },
});

const PrefooterAdverts = (props) => {
  const {
    classes,
    language,
  } = props;
  return (
    <Grid container lg={3} className={classes.root} alignItems="center" justify="center">
      <Hidden only={['xs', 'sm', 'lg', 'xl']} implementation="css">
        <Grid item>
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item className={classes.adMessageContainer}>
              <Typography variant="h5" className={classes.adMessage}>
                Go mobile with {process.env.BRAND_NAME}
              </Typography>
              <Typography variant="h6" className={classes.adMessage}>Download the app today!</Typography>
            </Grid>
            <Grid item className={classes.appContainerItem}>
              <Grid container direction="row" justify="space-between" alignItems="center" className={classes.iconsContainer}>
                <Tooltip title={`Download ${process.env.BRAND_NAME} on your iPhone/iPad`} aria-label={`Download ${process.env.BRAND_NAME} on your iPhone/iPad`}>
                  <IconButton className={classes.iconButton}>
                    <FontAwesomeIcon icon={['fab', 'apple']} className={`${classes.appIcon} ${classes.apple}`} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Download ${process.env.BRAND_NAME} on your Android device`} aria-label={`Download ${process.env.BRAND_NAME} on your Android device`}>
                  <IconButton className={classes.iconButton}>
                    <FontAwesomeIcon icon={['fab', 'android']} className={`${classes.appIcon} ${classes.android}`} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden only={['xs', 'sm', 'lg', 'xl']} implementation="css">
        <Divider orientation="vertical" className={classes.separator} />
      </Hidden>
      <Grid item>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item className={classes.adMessageContainer}>
            <Typography variant="h5" className={classes.adMessage}>
              Socialize with {process.env.BRAND_NAME}
            </Typography>
            <Typography variant="h6" className={classes.adMessage}>Join the gang!</Typography>
          </Grid>
          <Grid item className={classes.appContainerItem}>
            <Grid container direction="row" justify="space-between" alignItems="center" className={classes.iconsContainer}>
              <Tooltip title={`Like ${process.env.BRAND_NAME} on Facebook`} aria-label={`Like ${process.env.BRAND_NAME} on Facebook`}>
                <IconButton className={classes.iconButton}>
                  <FontAwesomeIcon icon={['fab', 'facebook']} className={`${classes.appIcon} ${classes.facebook}`} />
                </IconButton>
              </Tooltip>
              <Tooltip title={`Follow ${process.env.BRAND_NAME} on Twitter`} aria-label={`Follow ${process.env.BRAND_NAME} on Twitter`}>
                <IconButton className={classes.iconButton}>
                  <FontAwesomeIcon icon={['fab', 'twitter']} className={`${classes.appIcon} ${classes.twitter}`} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* Internal advertisement */}
      {/* If logged in, advertise product */}
      {/* If not logged in, advertise membership */}
    </Grid>
  );
};

PrefooterAdverts.propTypes = {
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
)(withStyles(styles)(PrefooterAdverts));
