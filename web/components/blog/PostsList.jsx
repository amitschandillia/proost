import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NetworkStatus } from 'apollo-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';
import Loading from './Loading';
import PostPreviewsGrid from './PostPreviewsGrid';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
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

export const GET_POSTS = getPostsQuery;

export const getPostsQueryVars = {
  start: 0,
  limit: 12,
};

const PostsList = (props) => {
  const {
    classes,
    closeMenu,
  } = props;

  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  } = useQuery(
    GET_POSTS,
    {
      variables: getPostsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => closeMenu());

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMorePosts) return <Loading />;

  const { posts, postsConnection } = data;
  const areMorePosts = posts.length < postsConnection.aggregate.count;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        start: posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult, // Append the new posts results to the old one
          posts: [...previousResult.posts, ...fetchMoreResult.posts],
        };
      },
    });
  };

  return (
    <Grid item className={classes.root}>
      <PostPreviewsGrid posts={posts} />
      {areMorePosts && (
        <div className={classes.more}>
          {loadingMorePosts ? (
            <CircularProgress style={{ opacity: 0.3 }} />
          ) : (
            <Button color="primary" className={classes.button} onClick={loadMorePosts}>Show more</Button>
          )}
        </div>
      )}
    </Grid>
  );
};

PostsList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(PostsList);

const mapStateToProps = (state) => ({
  // ip: state.ip,
});

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => {
    dispatch({ type: 'OPENBLOGMENU', payload: false });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostsList));
