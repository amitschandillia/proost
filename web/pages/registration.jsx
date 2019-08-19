import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import NavBar from '../components/NavBar';
import LinkTo from '../components/LinkTo';
import CompleteRegistrationForm from '../components/CompleteRegistrationForm';
import RegistrationError from '../components/RegistrationError';

const styles = theme => ({
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
  const { classes, token, email, expired, retrievedData, error } = props;
  const title = 'Complete Registration | Project Proost';
  const description = 'This is the description for the complete registration page';

  return (
    <Fragment>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} />
      <Box my={4} className={classes.root}>
        {error && <RegistrationError />}
        {!error && <CompleteRegistrationForm
          email={email}
          token={token}
          expired={expired}
          retrievedData={retrievedData}
        />}
        <Typography gutterBottom>
          <LinkTo href="/">
            <a>Go home</a>
          </LinkTo>
        </Typography>
      </Box>
    </Fragment>
  );
};

Registration.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

// Uncomment the following snippet to pass custom props to the component
Registration.getInitialProps = ({req, query}) => {
  var retrievedData = {};
  var initProps = {};
  if(req) {
    if(req.existingUser) {
      const {firstName, lastName, username} = req.existingUser;
      retrievedData = {firstName, lastName, username};
    }
    initProps = {token: query.t, email: query.i, expired: req.expired, retrievedData};
  } else {
    initProps = {error: true};
  }
  return initProps;
};

export default withStyles(styles)(Registration);
