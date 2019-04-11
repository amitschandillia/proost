/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';

const Post = (props) => {
  const title = 'About | New Project Proost PWA Prototype';
  const description = 'This is the description for the homepage';
  const { router } = props;
  return (
    <Layout>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <h1>{router.query.title}</h1>
      <p>This is the blog post content.</p>
    </Layout>
  );
};

Post.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      title: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(Post);
