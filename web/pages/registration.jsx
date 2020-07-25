import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from '@material-ui/core/Container';

import CompleteRegistrationForm from '../components/CompleteRegistrationForm';
import LinkTo from '../components/LinkTo';
import RegistrationError from '../components/RegistrationError';
import Layout from '../components/Layout';
import PageBody from '../components/PageBody';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    // paddingTop: theme.spacing(20),
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
    <Layout
      title = {title}
      description = {description}
      pageURL = {pageURL}
    >
      <PageBody>
        <Box my={4} mx="auto" maxWidth={500} className={classes.root}>
          {error && <RegistrationError />}
          {!error && (
          <CompleteRegistrationForm
            email={email}
            token={token}
            expired={expired}
            retrievedData={retrievedData}
          />
          )}
        </Box>
      </PageBody>
    </Layout>
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
