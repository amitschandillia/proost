import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import Layout from '../../../components/Layout';
import PageBody from '../../../components/PageBody';
import LinkTo from '../../../components/LinkTo';

const styles = (theme) => ({
  root: {},
});

const pageURL = `${process.env.BASE_URL}/blog`;

const Authors = (props) => {
  const {
    classes,
    language,
  } = props;
  const title = 'Blog Authors | Project Proost';
  const description = 'This is the description for the Blog page';

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        <h1>Blog Authors Home</h1>
        <div><LinkTo hoverNone href="/about">About</LinkTo></div>
        <div><LinkTo hoverNone href="/blog/authors/[slug]" as={`/blog/authors/amit`}>Amit</LinkTo></div>
        <div><LinkTo hoverNone href="/blog/authors/[slug]" as={`/blog/authors/john`}>John</LinkTo></div>
        <div><LinkTo hoverNone href="/blog/authors/[slug]" as={`/blog/authors/pintu`}>Pintu</LinkTo></div>
      </PageBody>
    </Layout>
  );
};

Authors.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Authors);
