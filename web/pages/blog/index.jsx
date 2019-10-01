import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import { withApollo } from '../../apollo';
import PostsList from '../../components/blog/PostsList';
import Layout from '../../components/Layout';
import PageBody from '../../components/PageBody';
import SinglePost from '../../components/blog/SinglePost';

const styles = (theme) => ({
  root: {},
});

const Blog = (props) => {
  const {
    classes,
    language,
    query: { postSlug },
  } = props;
  let title, description, pageURL;

  if(!postSlug) {
    title = 'Blog | Project Proost';
    description = 'This is the description for the Blog page';
    pageURL = `${process.env.BASE_URL}/blog`;
  } else {
    pageURL = `${process.env.BASE_URL}/blog/posts/${postSlug}`;
  }

  return (
    <Layout
      title={title ? title : undefined}
      description={description ? description : undefined}
      pageURL={pageURL}
    >
      <PageBody>
        {postSlug && <SinglePost slug={postSlug} />}
        {!postSlug && <PostsList />}
      </PageBody>
    </Layout>
  );
};

Blog.getInitialProps = async ({ query }) => {
  return {query};
};

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Blog));
