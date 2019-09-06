import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../components/blog/PostsList';
import LinkTo from '../components/LinkTo';
import Layout from '../components/Layout';
import PageBody from '../components/PageBody';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const pageURL = `${process.env.BASE_URL}/blog`;

const Blog = (props) => {
  const { classes } = props;
  const title = 'Blog | Project Proost';
  const description = 'This is the description for the Blog page';

  return (
    <Layout
      title = {title}
      description = {description}
      pageURL = {pageURL}
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
    paragraph: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Blog);
