/* eslint no-dupe-keys: 0 */

import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getPostsQuery from '../../apollo/schemas/getPostsQuery.graphql';
import LinkTo from '../LinkTo';
import ThreePicsItem from '../ThreePicsItem';
import Loading from './Loading';

const styles = (theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightLight,
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.htmlFontSize * 1.5,
    },
  },
  subTitle: {
    fontWeight: theme.typography.fontWeightLight,
    lineHeight: 'inherit',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  iconText: {
    marginLeft: theme.spacing(1),
  },
});

export const GET_POSTS = getPostsQuery;

export const getPostsQueryVars = {
  start: 0,
  limit: 3,
};

const ThreeLatest = (props) => {
  const { classes } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_POSTS,
    {
      variables: getPostsQueryVars,
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
    <Grid container direction="row">
      {posts.map((post) => {
        let thumbnailImg;
        if (post.thumbnail) {
          thumbnailImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${post.thumbnail.hash}${post.thumbnail.ext}`;
        } else {
          thumbnailImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/post/thumbnail.jpg`;
        }
        const minute = post.readTime > 1 ? 'minutes' : 'minute';
        const author = `${post.author.firstName} ${post.author.lastName}`;

        return (
          <ThreePicsItem picture={thumbnailImg}>
            <LinkTo hoverNone href={`/blog?postSlug=${post.slug}`} as={`/blog/posts/${post.slug}`}>
              <Typography variant="h4" className={classes.title}>{post.title}</Typography>
            </LinkTo>
            <Typography variant="h5" className={classes.subTitle}>{post.secondaryTitle}</Typography>
            <Grid container direction="row" justify="space-between" alignItems="center">
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  <Grid item><AccessTimeIcon /></Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2" className={classes.iconText}>
                      {post.readTime}
                      {' '}
                      {minute}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="row" alignItems="center">
                  <Grid item><PersonIcon /></Grid>
                  <Grid item>
                    <Typography gutterBottom variant="body2" className={classes.iconText}>{author}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </ThreePicsItem>
        );
      })}
    </Grid>
  );
};

ThreeLatest.propTypes = {
  classes: PropTypes.shape({
    title: PropTypes.string,
    subTitle: PropTypes.string,
    iconText: PropTypes.string,
  }).isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(ThreeLatest));
