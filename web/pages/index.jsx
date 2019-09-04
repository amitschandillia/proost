/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

// import Banner from '../components/Banner';
import VideoBanner from '../components/VideoBanner';
import LinkTo from '../components/LinkTo';
import NavBar from '../components/NavBar';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const pageURL = `${process.env.BASE_URL}`;

const Index = (props) => {
  const {
    classes, userInfo, sessID, custom,
  } = props;
  const title = 'Home | Project Proost';
  const description = 'This is the description for the homepage';
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} transparent />
      <VideoBanner>
        <Typography variant="h5">This is a text</Typography>
      </VideoBanner>
      <Box my={4} className={classes.root}>
        <div>
          nameToAddress from Redux:
          {userInfo.nameToAddress}
        </div>
        <div>
          sessID from Redux:
          {sessID}
        </div>
        <Typography variant="h4" component="h1" gutterBottom>
            Material-UI
        </Typography>
        <Typography gutterBottom>
          <LinkTo href="/about" color="secondary">
              Go to the about page
          </LinkTo>
        </Typography>
        <Typography gutterBottom>
          <LinkTo href="/blog">
            View posts page
          </LinkTo>
        </Typography>
        <Button size="large" variant="contained" color="primary">
            Super Secret Password
        </Button>
        <Button size="large" variant="contained" color="secondary">
            Super Secret Password
        </Button>
        <p className={classes.paragraph}>All men must die</p>
        <p className="xt test">test</p>
      </Box>
    </>
  );
};

Index.propTypes = {
  sessID: PropTypes.string.isRequired,
  custom: PropTypes.string.isRequired,
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

export default connect((state) => state)(withStyles(styles)(Index));
