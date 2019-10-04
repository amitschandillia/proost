import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './FontAwesomeLibrary';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  signInText: {
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  iconContainer: {
    paddingLeft: theme.spacing(2),
  },
  icon: {
    width: theme.spacing(2),
    verticalAlign: 'text-bottom',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

const SocialIcon = (props) => {
  const { classes, providerIcon } = props;

  return (
    <Grid item xl className={classes.iconContainer}>
      <FontAwesomeIcon icon={['fab', providerIcon]} className={classes.icon} />
    </Grid>
  );
};

SocialIcon.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    signInText: PropTypes.string,
    socialsIcon: PropTypes.string,
  }).isRequired,
  providerIcon: PropTypes.string.isRequired,
};

export default connect((state) => state)(withStyles(styles)(SocialIcon));
