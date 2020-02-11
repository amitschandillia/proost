/* eslint no-param-reassign: 0 */
import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { NetworkStatus } from 'apollo-client';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getTagQuery from '../../apollo/schemas/getTagQuery.graphql';
import Loading from './Loading';
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

export const GET_TAG = getTagQuery;

export const getTagQueryVars = {
  postStart: 0,
  postLimit: 12,
};

const SingleTag = (props) => {
  const {
    classes,
    tagSlug,
    closeMenu,
    pageURL,
  } = props;

  const {
    loading,
    error,
    data,
    fetchMore,
    networkStatus,
  } = useQuery(
    GET_TAG,
    {
      variables: { where: { slug: tagSlug }, tagFilter: {isPublished: true, tags: {slug_contains: tagSlug}}, ...getTagQueryVars },
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

  const { tags, postsConnection } = data;
  if (tags.length === 0) return <div>No data was returned!</div>;
  const [tag] = tags;
  const {
    _id,
    name,
    description,
    posts,
  } = tag;

  const postCount = postsConnection.aggregate.count;
  const areMorePosts = posts.length < postCount;

  const loadMorePosts = () => {
    fetchMore({
      variables: {
        postStart: posts.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        previousResult.tags[0].posts = [
          ...previousResult.tags[0].posts,
          ...fetchMoreResult.tags[0].posts,
        ];
        return {
          ...previousResult, // Append the new posts results to the old one
          tags: [...previousResult.tags, ...fetchMoreResult.tags],
        };
      },
    });
  };

  return (
    <>
      <Head>
        <title>{tagSlug}</title>
        <meta name="description" content={`Posts categorized under ${tagSlug}`} key="tagDescription" />
      </Head>
      <Grid item className={classes.root}>
        <Typography variant="h3" component="h1" gutterBottom className={classes.name}>{name}</Typography>
        <Typography variant="body1" paragraph>{description}</Typography>
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
    </>
  );
};

SingleTag.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    name: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  tagSlug: PropTypes.string.isRequired,
};

// export default withStyles(styles)(SingleTag);

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
)(withStyles(styles)(SingleTag));
