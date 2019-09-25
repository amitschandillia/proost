import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';
import Loading from './Loading';
import PostPreviewsGrid from './PostPreviewsGrid';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export const GET_POSTS = gql`${getPostsQuery}`;

export const getPostsQueryVars = {
  start: 0,
  limit: 8,
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

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMorePosts) return <Loading />;

  const { posts, postsConnection } = data;
  const areMorePosts = posts.length < postsConnection.aggregate.count;

  return (
    <Grid item className={classes.root}>
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
  );
};

export default withStyles(styles)(PostsList);
