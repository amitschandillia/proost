import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/styles';
import { googleTheme, facebookTheme, twitterTheme } from '../themes/socialsTheme';

// For icons list, refer: https://github.com/FortAwesome/Font-Awesome/tree/1975bba5c4ade236c02bf2e5f9551160ee85109d/js-packages/%40fortawesome
library.add(faFacebookF);
library.add(faGoogle);
library.add(faTwitter);

const styles = theme => ({
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

const SocialButton = (props) => {
  const { classes } = props;
  const { pageURL } = props;
  const { provider } = props;
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
  return (
    <Grid container item direction="column" justify="space-evenly" alignItems="stretch">
      <ThemeProvider theme={providerTheme}>
        <Button variant="contained" size="large" color="primary" href={callback}>
          <Grid container>
            <Grid item xl className={classes.socialsIcon}>
              <FontAwesomeIcon icon={['fab', providerIcon]} />
            </Grid>
            <Grid item xs className={classes.signInText}>
              <span>{providerLabel}</span>
            </Grid>
          </Grid>
        </Button>
      </ThemeProvider>
    </Grid>
  );
};

export default withStyles(styles)(SocialButton);
