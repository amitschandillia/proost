/* eslint-disable no-unused-vars */

import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import NavBar from './NavBar';
import Footer from '../components/Footer';
import Prefooter from '../components/Prefooter';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
  root: {
    minHeight: '100vh',
  },
});

const Layout = (props) => {
  const {
    classes,
    title,
    description,
    pageURL,
    transparent = false,
    children,
  } = props;
  return (
    <>
      <Head>
        {Boolean(title) && <title>{title}</title>}
        {Boolean(description) && <meta name="description" content={description} key="description" />}
      </Head>
      <NavBar pageURL={pageURL} transparent={transparent} />
      <Grid container alignItems="flex-end" className={classes.root}>
        {children}
        <Grid container alignItems="flex-end">
          <Prefooter />
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

Layout.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Layout);
