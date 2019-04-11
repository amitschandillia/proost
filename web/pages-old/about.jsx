/* eslint-disable no-unused-vars */

import React, { PureComponent, Fragment } from 'react';
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
        <Link href="/">
          <a style={linkStyle2}>HOME</a>
        </Link>
      </Layout>
    );
  }
}

export default About;
