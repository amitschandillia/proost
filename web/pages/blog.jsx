import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React from 'react';

import PostsList from '../components/blog/PostsList';
import LinkTo from '../components/LinkTo';
import NavBar from '../components/NavBar';

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
    <>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} />
      <Box my={4} className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography gutterBottom>
          <LinkTo href="/">
            Go home
          </LinkTo>
        </Typography>
        <PostsList />
      </Box>
    </>
  );
};

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Blog);
