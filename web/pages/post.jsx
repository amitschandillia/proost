/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Layout from '../components/Layout';

const Post = (props) => {
  const { router } = props;
  return (
    <Layout>
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
