import { useQuery } from '@apollo/react-hooks';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

import getMenuPostsQuery from '../../apollo/schemas/getMenuPostsQuery.graphql';
import LinkTo from '../LinkTo';
import Loading from './Loading';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
  ul: {
    textAlign: 'left',
    paddingLeft: 0,
  },
  li: {
    listStyleType: 'none',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    '&:last-child': {
      borderBottom: 'none',
    },
  },
  entry: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  header: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(1),
  },
  more: {
    marginTop: theme.spacing(2),
  },
});

export const GET_MENU_POSTS = getMenuPostsQuery;

const MenuPosts = (props) => {
  const { classes } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_MENU_POSTS,
    {
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading contained={true} />;

  const { posts, postsConnection } = data;
  const areMorePosts = posts.length < postsConnection.aggregate.count;

  return (
    <ul className={classes.ul}>
      <li className={classes.li}>
        <Typography variant="button" component="p" className={classes.header}>
          <LinkTo hoverNone href="/blog">
            Posts
          </LinkTo>
        </Typography>
      </li>
      {posts.map((post) => (
        <li className={classes.li}>
          <Typography variant="body1" className={classes.entry}>
            <LinkTo hoverNone href={`/blog?postSlug=${post.slug}`} as={`/blog/posts/${post.slug}`}>
              {post.title}
            </LinkTo>
          </Typography>
        </li>
      ))}
      {areMorePosts && (
        <li className={classes.li}>
          <Typography variant="button" component="p" className={classes.more}>
            <LinkTo hoverNone href="/blog">
              More...
            </LinkTo>
          </Typography>
        </li>
      )}
    </ul>
  );
};

MenuPosts.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(MenuPosts);
