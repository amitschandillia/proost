import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';
import Loading from './Loading';
import Grid from '@material-ui/core/Grid';
import PostPreview from './PostPreview';
import withStyles from '@material-ui/core/styles/withStyles';
import React, { useLayoutEffect } from 'react';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
});

export const GET_POSTS = gql`${getPostsQuery}`;

export const getPostsQueryVars = {
  start: 0,
  limit: 7,
};

const PostsList = (props) => {
  const { classes } = props;
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

  const loadingMorePosts = networkStatus === NetworkStatus.fetchMore;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        start: posts.length
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return Object.assign({}, previousResult, {
          // Append the new posts results to the old one
          posts: [...previousResult.posts, ...fetchMoreResult.posts]
        })
      }
    })
  };

  const removeGridGaps = () => {
    const postPreviewContainers = document.getElementsByClassName('post-preview-container');
    const itemCount = postPreviewContainers.length;
    if(itemCount && itemCount > 0) {
      let itemsPerRow;
      // The following snippet doesn't account for itemCounts below 6, 4, 3, or 2.
      if(postPreviewContainers[0].offsetTop === postPreviewContainers[5].offsetTop) { itemsPerRow = 6; }
      else if(postPreviewContainers[0].offsetTop === postPreviewContainers[3].offsetTop) { itemsPerRow = 4; }
      else if(postPreviewContainers[0].offsetTop === postPreviewContainers[2].offsetTop) { itemsPerRow = 3; }
      else if(postPreviewContainers[0].offsetTop === postPreviewContainers[1].offsetTop) { itemsPerRow = 2; }
      else { itemsPerRow = 1; }

      for (let col = 0; col <= itemsPerRow - 1; col++) {
        var row = itemsPerRow;
        while((col + row) < itemCount) {
          // logic to remove gaps
          // a = element above
          var elemAbove = postPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          var elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = post-preview element inside elemAbove
          var elemAbovePreview = elemAbove.getElementsByClassName('post-preview')[0];
          // apb = ap's height
          var elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          var gap = -Math.abs( elemAboveHeight - elemAbovePreviewHeight - 16);
          postPreviewContainers[col + row].style.marginTop = `${gap}px`;
          row += itemsPerRow;
        }
      }
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', removeGridGaps);
    window.addEventListener('scroll', removeGridGaps);
    removeGridGaps();
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('resize', removeGridGaps);
      window.removeEventListener('scroll', removeGridGaps);
    };
  }, []);

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMorePosts) return <Loading />;

  const { posts, postsConnection } = data;
  const areMorePosts = posts.length < postsConnection.aggregate.count;

  return (
    <Grid item className={classes.root}>
      <Grid container spacing={2} direction="row">
        {posts.map((post) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={`post-preview-container`}>
              <PostPreview
                title={post.title}
                urlPost={`https://www.schandillia.com/blog/posts/${post.slug}`}
                urlAuthor={`https://www.schandillia.com/blog/authors/${post.author.username}`}
                excerpt={post.excerpt}
                thumbnail={`https://i.schandillia.com/d/${post.thumbnail.hash}${post.thumbnail.ext}`}
                author={`${post.author.firstName} ${post.author.lastName}`}
              />
            </Grid>
          );
        })}
      </Grid>
      {areMorePosts && (
        <button onClick={() => loadMorePosts()} disabled={loadingMorePosts}>
          {loadingMorePosts ? 'Loading...' : 'Show More'}
        </button>
      )}
    </Grid>
  );
};

export default withStyles(styles)(PostsList);
