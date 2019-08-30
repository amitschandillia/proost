import ReactMarkdown from 'react-markdown';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const PostsList = ({ data: { error, posts } }) => {
  let res = '';
  if (error) {
    res = (
      <Typography variant="subtitle2" gutterBottom>
      Error retrieving posts!
      </Typography>
    );
  }
  if (posts && posts.length) {
    if (posts.length !== 0) {
      // Payload returned
      res = (
        <>
          {posts.map((post) => (
            <div>
              <Typography variant="h6" gutterBottom>{post.title}</Typography>
              <Typography variant="subtitle1" gutterBottom>{post.secondaryTitle}</Typography>
              <Typography variant="body1" gutterBottom>
                Post #
                {post._id}
              </Typography>
              <ReactMarkdown source={post.body} renderers={renderers} />
            </div>
          ))}
        </>
      );
    } else {
      res = (
      // No payload returned
        <Typography variant="subtitle2" gutterBottom>
          No posts Found
        </Typography>
      );
    }
  } else {
    res = (
    // Retrieving payload
      <CircularProgress />
    );
  }
  return res;
};

const query = gql`
  {
    posts {
      _id
      title
      secondaryTitle
      body
    }
  }
`;
// The 'graphql' wrapper executes a GraphQL query and makes the results
// available on the 'data' prop of the wrapped component (PostsList)
export default graphql(query, {
  props: ({ data }) => ({
    data,
  }),
})(PostsList);
