import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

// For icons list, refer: https://github.com/FortAwesome/Font-Awesome/tree/1975bba5c4ade236c02bf2e5f9551160ee85109d/js-packages/%40fortawesome
library.add(faFacebookF);
library.add(faGoogle);
library.add(faTwitter);

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
  socialsIcon: {
    paddingLeft: theme.spacing(2),
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
    <Grid item xl className={classes.socialsIcon}>
      <FontAwesomeIcon icon={['fab', providerIcon]} />
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
