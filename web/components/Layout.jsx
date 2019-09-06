/* eslint-disable no-unused-vars */

import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import NavBar from './NavBar';
import Footer from '../components/Footer';
import Prefooter from '../components/Prefooter';

const Layout = (props) => {
  const {
    title,
    description,
    pageURL,
    transparent = false,
    children,
  } = props;
  return (
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} transparent={transparent} />
      {children}
      <Prefooter />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

export default Layout;
