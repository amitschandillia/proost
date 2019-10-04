import { useQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

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

export const GET_USERS = gql`${getUsersQuery}`;

export const getUsersQueryVars = {
  start: 0,
  limit: 12,
};

const AuthorsList = (props) => {
  const { classes } = props;
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

  const loadingMoreUsers = networkStatus === NetworkStatus.fetchMore;

  if (error) return <div>There was an error!</div>;
  if (loading && !loadingMoreUsers) return <Loading />;

  const { users, usersConnection } = data;
  const areMoreUsers = users.length < usersConnection.aggregate.count;

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
      <AuthorPreviewsGrid users={users} />
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

export default withStyles(styles)(AuthorsList);
