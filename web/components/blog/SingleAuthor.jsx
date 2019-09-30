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

const styles = (theme) => ({
  root: {},
});

export const GET_USER = gql`${getUserQuery}`;

export const getUserQueryVars = {
  postStart: 0,
  postLimit: 2,
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
      // variables: {username: authorSlug},
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
        postStart: posts.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        // console.log('previousResult', previousResult);
        // console.log('fetchMoreResult', fetchMoreResult);
        let oldRes = {...previousResult};
        let newRes = {...fetchMoreResult};
        let oldPosts = oldRes.users[0].posts;
        let newPosts = newRes.users[0].posts;
        oldRes.users[0].posts = [...oldPosts, ...newPosts];
        // console.log('Final result', oldRes);

        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          users: [...oldRes.users],
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

  console.log('postCount', postCount);
  console.log('areMorePosts', areMorePosts);

  return (
    <>
      <Head>
        <title>{`${firstName} ${lastName}`}</title>
        <meta name="description" content={`Posts by ${firstName} ${lastName}`} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <h1>{firstName} {lastName}</h1>
        <p>{_id}</p>
        <p>{bio}</p>
        {posts.map((post) => {
          return (
            <h2>{post.title}</h2>
          );
        })}
        {areMorePosts && (
          <div className={classes.root}>
            {loadingMorePosts ? (
              <CircularProgress style={{opacity: 0.3}} />
            ) : (
              <Button color="primary" className={classes.root} onClick={loadMorePosts}>Show more</Button>
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
