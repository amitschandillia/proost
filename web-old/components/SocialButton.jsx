import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { facebookTheme, googleTheme, twitterTheme } from '../themes/brand-themes';
import SocialIcon from './SocialIcon';

const styles = (theme) => ({
  root: {
    color: 'white',
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
});

const SocialButton = (props) => {
  const { classes, provider, pageURL } = props;
  let providerTheme;
  let providerIcon;
  let providerLabel;
  switch (provider) {
    case 'google':
      providerTheme = googleTheme;
      providerIcon = 'google';
      providerLabel = 'Sign in with Google';
      break;
    case 'twitter':
      providerTheme = twitterTheme;
      providerIcon = 'twitter';
      providerLabel = 'Sign in with Twitter';
      break;
    case 'facebook':
      providerTheme = facebookTheme;
      providerIcon = 'facebook-f';
      providerLabel = 'Sign in with Facebook';
      break;
    default:
      providerTheme = 'local';
      break;
  }
  const callback = `/auth/${provider}?callback=${pageURL}`;

  const clickHandler = () => {
    window.location = callback;
  };

  return (
    <Grid container item direction="column" justify="space-evenly" alignItems="stretch">
      <ThemeProvider theme={providerTheme}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          className={classes.root}
          onClick={(e) => { e.preventDefault(); clickHandler(); }}
        >
          <Grid container>
            <SocialIcon providerIcon={providerIcon} />
            <Grid item xs className={classes.signInText}>
              <span>{providerLabel}</span>
            </Grid>
          </Grid>
        </Button>
      </ThemeProvider>
    </Grid>
  );
};

SocialButton.propTypes = {
  pageURL: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    signInText: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  // ip: state.ip,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(SocialButton));
