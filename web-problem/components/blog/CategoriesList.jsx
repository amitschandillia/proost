import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NetworkStatus } from 'apollo-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getCategoriesQuery from '../../apollo/schemas/getCategoriesQuery.graphql';
import CategoryPreviewsGrid from './CategoryPreviewsGrid';
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

export const GET_CATEGORIES = getCategoriesQuery;

export const getCategoriesQueryVars = {
  start: 0,
  limit: 12,
};

const CategoriesList = (props) => {
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
    GET_CATEGORIES,
    {
      variables: getCategoriesQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => closeMenu());

  const loadingMoreCategories = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMoreCategories) return <Loading />;

  const { categories, categoriesConnection } = data;
  const areMoreCategories = categories.length < categoriesConnection.aggregate.count;

  const loadMoreCategories = () => {
    fetchMore({
      variables: {
        start: categories.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult, // Append the new categories results to the old one
          categories: [...previousResult.categories, ...fetchMoreResult.categories],
        };
      },
    });
  };

  return (
    <Grid item className={classes.root}>
      <CategoryPreviewsGrid categories={categories} />
      {areMoreCategories && (
        <div className={classes.more}>
          {loadingMoreCategories ? (
            <CircularProgress style={{ opacity: 0.3 }} />
          ) : (
            <Button color="primary" className={classes.button} onClick={loadMoreCategories}>Show more</Button>
          )}
        </div>
      )}
    </Grid>
  );
};

CategoriesList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(CategoriesList);

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
)(withStyles(styles)(CategoriesList));
