/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LinkTo from './LinkTo';
import VerticalDivider from './VerticalDivider';
import IconButton from '@material-ui/core/IconButton';
import UnitedStates from './svg-icons/flags/UnitedStates';

import FlagButton from './FlagButton';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      jusrifyContent: 'inherit',
    },
  },
  copyright: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  footerLogo: {
    marginRight: theme.spacing(1),
  },
  footerLinksContainer: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
  footerLinks: {
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'inherit',
    },
  },
  flag: {
    padding: 0,
  },
});

const Footer = (props) => {
  const {
    classes, ip
  } = props;

  return (
    <Grid container alignItems="center" justify="space-between" className={classes.root}>
      <Grid item xs={12} sm={6} alignItems="center" className={classes.copyright}>
        <img className={classes.footerLogo} src="_f/images/desktop-header-logo.png" width="48" height="48" />
        &copy;
        {` 2015-${new Date().getFullYear()}`}
        {` ${process.env.COPYRIGHT_ENTITY}. All Rights Reserved.`}
      </Grid>
      <Grid item xs={12} sm={6} className={classes.footerLinksContainer}>
        <Grid className={classes.footerLinks} container justify="flex-end" alignItems="center">
          <LinkTo hoverNone href="/">Terms</LinkTo>
          <VerticalDivider />
          <LinkTo hoverNone href="/">Privacy</LinkTo>
          <VerticalDivider />
          <LinkTo hoverNone href="/">About</LinkTo>
          <VerticalDivider />
          <FlagButton lang="german" />
        </Grid>
      </Grid>
    </Grid>
  );
};

Footer.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ip: state.ip,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Footer));
