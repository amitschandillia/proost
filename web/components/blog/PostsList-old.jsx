import { useQuery } from '@apollo/react-hooks';
import Typography from '@material-ui/core/Typography';
import { NetworkStatus } from 'apollo-client';
import gql from 'graphql-tag';
import ReactMarkdown from 'react-markdown';

import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';
import Loading from './Loading';

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

export const GET_POSTS = gql`${getPostsQuery}`;

export default function PostsList() {
  const {
    loading, error, data, networkStatus,
  } = useQuery(
    GET_POSTS,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { posts } = data;
  return (
    <>
      {posts.map((post) => (
        <div>
          <Typography variant="h6" gutterBottom>{post.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>{post.secondaryTitle}</Typography>
          <Typography variant="body1" gutterBottom>
            Post #
            {post._id}
          </Typography>
          <Typography variant="body1">
            {`Banner: https://i.schandillia.com/d/${post.banner.hash}${post.banner.ext}`}
          </Typography>
          <Typography variant="body1">
            {`Thumbnail: https://i.schandillia.com/d/${post.thumbnail.hash}${post.thumbnail.ext}`}
          </Typography>
          {/* <ReactMarkdown source={post.body} renderers={renderers} /> */}
        </div>
      ))}
    </>
  );
}
