/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const linkStyle2 = {
  color: 'green',
  marginRight: 15,
  fontWeight: 'bold',
};

class About extends Component {
  componentDidMount() {
    // ...
  }

  render() {
    return (
      <Layout>
        <p>This is the about page</p>
        <Link href="/newpage">
          <a style={linkStyle2}>New Page</a>
        </Link>
      </Layout>
    );
  }
}

export default About;
