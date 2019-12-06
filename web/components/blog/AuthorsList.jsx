import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NetworkStatus } from 'apollo-client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getUsersQuery from '../../apollo/schemas/getUsersQuery.graphql';
import AuthorPreviewsGrid from './AuthorPreviewsGrid';
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

export const GET_USERS = getUsersQuery;

export const getUsersQueryVars = {
  start: 0,
  limit: 12,
};

const AuthorsList = (props) => {
  const {
    classes,
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
    GET_USERS,
    {
      variables: getUsersQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => closeMenu());

  const loadingMoreUsers = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMoreUsers) return <Loading />;

  const { users, usersConnection } = data;
  const userCount = usersConnection.groupBy.username.length;
  const areMoreUsers = users.length < userCount;

  const loadMoreUsers = () => {
    fetchMore({
      variables: {
        start: users.length,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult;
        }
        return {
          ...previousResult, // Append the new users results to the old one
          users: [...previousResult.users, ...fetchMoreResult.users],
        };
      },
    });
  };

  return (
    <Grid item className={classes.root}>
      <AuthorPreviewsGrid users={users} pageURL={pageURL} />
      {areMoreUsers && (
        <div className={classes.more}>
          {loadingMoreUsers ? (
            <CircularProgress style={{ opacity: 0.3 }} />
          ) : (
            <Button color="primary" className={classes.button} onClick={loadMoreUsers}>Show more</Button>
          )}
        </div>
      )}
    </Grid>
  );
};

AuthorsList.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(AuthorsList);

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
)(withStyles(styles)(AuthorsList));
