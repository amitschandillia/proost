import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';

import Layout from '../../../components/Layout';
import PageBody from '../../../components/PageBody';
import LinkTo from '../../../components/LinkTo';
import { withApollo } from '../../../apollo';
import SinglePost from '../../../components/blog/SinglePost';

const styles = (theme) => ({
  root: {},
});

const pageURL = `${process.env.BASE_URL}/blog`;

const Post = (props) => {
  const {
    classes,
    language,
  } = props;
  const title = 'Blog Post | Project Proost';
  const description = 'This is the description for the Blog page';

  const router = useRouter();

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        <h1>{router.query.slug}</h1>
        <SinglePost slug={router.query.slug} />
      </PageBody>
    </Layout>
  );
};

Post.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Post));
