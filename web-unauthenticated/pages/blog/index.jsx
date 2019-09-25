import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import { withApollo } from '../../apollo';
import PostsList from '../../components/blog/PostsList';
import Layout from '../../components/Layout';
import PageBody from '../../components/PageBody';

const styles = (theme) => ({
  root: {},
});

const pageURL = `${process.env.BASE_URL}/blog`;

const Blog = (props) => {
  const {
    classes,
    language,
  } = props;
  const title = 'Blog | Project Proost';
  const description = 'This is the description for the Blog page';

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        <PostsList />
      </PageBody>
    </Layout>
  );
};

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Blog));
