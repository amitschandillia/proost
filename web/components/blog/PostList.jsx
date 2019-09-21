import { graphql } from "react-apollo";
import gql from 'graphql-tag';
import withData from "../../apollo/with-data";

import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';

import Typography from '@material-ui/core/Typography';
import ReactMarkdown from 'react-markdown';
import CircularProgress from '@material-ui/core/CircularProgress';
import Loading from './Loading';

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const GET_POSTS = gql`${getPostsQuery}`;

const PostList = ({classes, data: {error, loading, posts}}) => {
  let payload;
  if(error) {
    payload = <div>There was an error!</div>;
  } else if(loading) {
    payload = <Loading />
  } else {
    payload = (
      <>
        {posts.map((post) => (
          <div>
            <Typography variant="h6" gutterBottom>{post.title}</Typography>
            <Typography variant="subtitle1" gutterBottom>{post.secondaryTitle}</Typography>
            <Typography variant="body1" gutterBottom>
              Post #{post._id}
            </Typography>
            <Typography variant="body1">
              {`Banner: https://i.schandillia.com/d/${post.banner.hash}${post.banner.ext}`}
            </Typography>
            <Typography variant="body1">
              {`Thumbnail: https://i.schandillia.com/d/${post.thumbnail.hash}${post.thumbnail.ext}`}
            </Typography>
            <ReactMarkdown source={post.body} renderers={renderers} />
          </div>
        ))}
      </>
    );
  }
	return payload;
};

export default withData(graphql(GET_POSTS)(PostList));
