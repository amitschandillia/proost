import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import CompleteRegistrationForm from '../components/CompleteRegistrationForm';
import LinkTo from '../components/LinkTo';
import NavBar from '../components/NavBar';
import RegistrationError from '../components/RegistrationError';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const pageURL = `${process.env.BASE_URL}/registration`;

const Registration = (props) => {
  const {
    classes,
    token,
    email,
    expired,
    retrievedData,
    error,
  } = props;
  const title = 'Complete Registration | Project Proost';
  const description = 'This is the description for the complete registration page';

  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} />
      <Box my={4} className={classes.root}>
        {error && <RegistrationError />}
        {!error && (
        <CompleteRegistrationForm
          email={email}
          token={token}
          expired={expired}
          retrievedData={retrievedData}
        />
        )}
        <Typography gutterBottom>
          <LinkTo href="/">
            <a>Go home</a>
          </LinkTo>
        </Typography>
      </Box>
    </>
  );
};

Registration.propTypes = {
  token: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  expired: PropTypes.bool.isRequired,
  retrievedData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  error: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

// Uncomment the following snippet to pass custom props to the component
Registration.getInitialProps = ({ req, query }) => {
  let retrievedData = {};
  let initProps = {};
  if (req) {
    if (req.existingUser) {
      const { firstName, lastName, username } = req.existingUser;
      retrievedData = { firstName, lastName, username };
    }
    initProps = {
      token: query.t, email: query.i, expired: req.expired, retrievedData,
    };
  } else {
    initProps = { error: true };
  }
  return initProps;
};

export default withStyles(styles)(Registration);
