import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import Loading from './Loading';
import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import getPostQuery from '../../apollo/schemas/getPostQuery.graphql';
import ReactMarkdown from 'react-markdown';
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {},
});

export const GET_POST = gql`${getPostQuery}`;

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const SinglePost = (props) => {
  const {
    classes,
    language,
    slug,
  } = props;
  const {
    loading,
    error,
    data,
    networkStatus,
  } = useQuery(
    GET_POST,
    {
      variables: {slug},
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { posts } = data;
  const [{
    title,
    secondaryTitle,
    excerpt,
    body,
    readTime,
    banner: {
      hash,
      ext,
    },
    author: {
      username,
      firstName,
      lastName,
    },
  }] = posts;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <h1>{title}</h1>
        <h2>{secondaryTitle}</h2>
        <h3>{readTime} minutes</h3>
        <h5>{`https://i.${process.env.THIS_DOMAIN_LONG}/d/${hash}${ext}`}</h5>
        <h6>By: {`${firstName} ${lastName} (${username})`}</h6>
        <ReactMarkdown source={body} renderers={renderers} />
      </Grid>
    </>
  );
};

SinglePost.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(SinglePost);
