import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NetworkStatus } from 'apollo-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getTagsQuery from '../../apollo/schemas/getTagsQuery.graphql';
import TagPreviewsGrid from './TagPreviewsGrid';
import Loading from './Loading';

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

export const GET_TAGS = getTagsQuery;

export const getTagsQueryVars = {
  start: 0,
  limit: 12,
};

const TagsList = (props) => {
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
    GET_TAGS,
    {
      variables: getTagsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => closeMenu());

  const loadingMoreTags = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { tags, tagsConnection } = data;
  const areMoreTags = tags.length < tagsConnection.aggregate.count;

  const loadMoreTags = () => {
    fetchMore({
      variables: {
        start: tags.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult, // Append the new tags results to the old one
          tags: [...previousResult.tags, ...fetchMoreResult.tags],
        };
      },
    });
  };

  return (
    <Grid item className={classes.root}>
      <TagPreviewsGrid tags={tags} />
      {areMoreTags && (
        <div className={classes.more}>
          {loadingMoreTags ? (
            <CircularProgress style={{ opacity: 0.3 }} />
          ) : (
            <Button color="primary" className={classes.button} onClick={loadMoreTags}>Show more</Button>
          )}
        </div>
      )}
    </Grid>
  );
};

TagsList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(TagsList);

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
)(withStyles(styles)(TagsList));
