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

const styles = (theme) => ({
  root: {},
});

export const GET_USER = gql`${getUserQuery}`;

const SingleAuthor = (props) => {
  const {
    classes,
    authorSlug,
  } = props;

  const {
    loading,
    error,
    data,
    networkStatus,
  } = useQuery(
    GET_USER,
    {
      variables: {username: authorSlug},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { users } = data;
  const [user] = users;
  const {
    firstName,
    lastName,
    bio,
  } = user;

  return (
    <>
      <Head>
        <title>{`${firstName} ${lastName}`}</title>
        <meta name="description" content={`Posts by ${firstName} ${lastName}`} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <h1>{firstName} {lastName}</h1>
        <p>{bio}</p>
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
