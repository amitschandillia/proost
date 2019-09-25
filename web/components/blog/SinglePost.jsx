import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import getPostQuery from '../../apollo/schemas/getPostQuery.graphql';
import Loading from './Loading';
import PostPreviewsGrid from './PostPreviewsGrid';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography';

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

export const GET_POST = gql`${getPostQuery}`;

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const SinglePost = (props) => {
  const { classes, slug } = props;
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
    readTime,
    body,
    banner: {
      hash,
      ext,
    },
    author: {
      _id,
      username,
      firstName,
      lastName,
    },
  }] = posts;

  return (
    <Grid item className={classes.root}>
      <h2>{title}</h2>
      <h3>{secondaryTitle}</h3>
      <h4>Read time: {readTime} minutes</h4>
      <h5>Banner: {`https://i.schandillia.com/d/${hash}${ext}`}</h5>
      <h6>By: {`${firstName} ${lastName} (${username})`}</h6>
      <ReactMarkdown source={body} renderers={renderers} />
    </Grid>
  );
};

export default withStyles(styles)(SinglePost);
