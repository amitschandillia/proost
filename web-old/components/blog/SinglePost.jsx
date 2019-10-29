import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

import getPostQuery from '../../apollo/schemas/getPostQuery.graphql';
import Loading from './Loading';

const styles = () => ({
  root: {},
});

export const GET_POST = getPostQuery;

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const SinglePost = (props) => {
  const {
    classes,
    slug,
  } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_POST,
    {
      variables: { slug },
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
        <h3>
          {readTime}
          {' '}
minutes
        </h3>
        <h5>{`https://i.${process.env.THIS_DOMAIN_LONG}/d/${hash}${ext}`}</h5>
        <h6>
By:
          {`${firstName} ${lastName} (${username})`}
        </h6>
        <ReactMarkdown source={body} renderers={renderers} />
      </Grid>
    </>
  );
};

SinglePost.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    name: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

export default withStyles(styles)(SinglePost);