/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';

const PostLink = (props) => {
  const { id, title } = props;
  return (
    <li>
      <Link as={`/p/${id}`} href={`/post?title=${title}`}>
        <a>{title}</a>
      </Link>
    </li>
  );
};

class Index extends Component {
  componentDidMount() {
    // ...
  }

  render() {
    return (
      <Layout>
        <h1>My Blog</h1>
        <ul>
          <PostLink id="hello-nextjs" title="Hello Next.js" />
          <PostLink id="learn-nextjs" title="Learn Next.js is awesome" />
          <PostLink id="deploy-nextjs" title="Deploy apps with Zeit" />
        </ul>
      </Layout>
    );
  }
}

PostLink.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Index;
