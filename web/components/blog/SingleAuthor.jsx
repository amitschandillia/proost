import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import Loading from './Loading';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import getUserQuery from '../../apollo/schemas/getUserQuery.graphql';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostPreviewsGrid from './PostPreviewsGrid';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
  name: {
    fontWeight: 300,
    paddingBottom: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  more: {
    textAlign: 'center',
    width: '100%',
    paddingTop: theme.spacing(6),
  },
  button: {
    fontSize: theme.spacing(2),
  },
});

export const GET_USER = gql`${getUserQuery}`;

export const getUserQueryVars = {
  postStart: 0,
  postLimit: 12,
};

const SingleAuthor = (props) => {
  const {
    classes,
    authorSlug,
  } = props;

  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  } = useQuery(
    GET_USER,
    {
      variables: {username: authorSlug, ...getUserQueryVars},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        postStart: posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        previousResult.users[0].posts = [
          ...previousResult.users[0].posts,
          ...fetchMoreResult.users[0].posts,
        ];
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          users: [...previousResult.users, ...fetchMoreResult.users]
        })
      }
    })
  };

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMorePosts) return <Loading />;

  const { users, postsConnection } = data;
  const [user] = users;
  const {
    _id,
    firstName,
    lastName,
    bio,
    posts,
  } = user;

  const postCount = postsConnection.groupBy.author.find(({key}) => key === _id).connection.aggregate.count;
  const areMorePosts = posts.length < postCount;

  posts.forEach((post, index) => {
    posts[index].author = {
      firstName,
      lastName,
      username: authorSlug,
    };
  });

  return (
    <>
      <Head>
        <title>{`${firstName} ${lastName}`}</title>
        <meta name="description" content={`Posts by ${firstName} ${lastName}`} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <Typography variant="h3" component="h1" gutterBottom className={classes.name}>{firstName} {lastName}</Typography>
        <Typography variant="body1" paragraph>{bio}</Typography>
        <PostPreviewsGrid posts={posts} />
        {areMorePosts && (
          <div className={classes.more}>
            {loadingMorePosts ? (
              <CircularProgress style={{opacity: 0.3}} />
            ) : (
              <Button color="primary" className={classes.button} onClick={loadMorePosts}>Show more</Button>
            )}
          </div>
        )}
      </Grid>
    </>
  );
};

SingleAuthor.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(SingleAuthor);
