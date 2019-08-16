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

import RegisterForm from '../components/RegisterForm';

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
  const { classes, token, email, expired, retrievedData } = props;
  const title = 'Registration | Project Proost';
  const description = 'This is the description for the registration page';

  return (
    <Fragment>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} />
      <Box my={4} className={classes.root}>
        <Typography variant="h4" gutterBottom>
          {token}
          {expired && '   This link has expired!'}
          <p>firstName {retrievedData.firstName}</p>
          <p>lastName {retrievedData.lastName}</p>
          <p>username {retrievedData.username}</p>
        </Typography>
        <RegisterForm pageURL={pageURL} email={email} />
        <Typography gutterBottom>
          <LinkTo href="/">
            <a>Go home</a>
          </LinkTo>
        </Typography>
        <Button variant="contained" color="primary">
                Super Secret Password
        </Button>
        <Button variant="contained" color="secondary">
                Super Secret Password
        </Button>
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
  if(req.existingUser) {
    const {firstName, lastName, username} = req.existingUser;
    retrievedData = {firstName, lastName, username};
  }
  return {token: query.t, email: query.i, expired: req.expired, retrievedData};
};

export default withStyles(styles)(Registration);
