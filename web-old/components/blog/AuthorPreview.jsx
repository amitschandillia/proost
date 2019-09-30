import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import React from 'react';

import LinkTo from '../LinkTo';

const styles = (theme) => ({
  root: {
    // border: '1px solid lightgrey',
    // boxShadow: 'none',
    // backgroundColor: 'initial',
  },
  media: {
    height: 0,
    paddingTop: '70%', // 56.25% for 16:9, 100% for 1:1
  },
  link: {
    color: 'dimgrey',
    textDecoration: 'none',
  },
  title: {
    fontWeight: 'bold',
  },
  author: {},
  postsHeader: {
    fontWeight: 'bold',
  },
  authoredPosts: {
    paddingTop: theme.spacing(2),
  },
  index: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
});

const AuthorPreview = (props) => {
  const {
    classes,
    username,
    firstName,
    lastName,
    thumbnail,
    posts,
  } = props;

  const hasPosts = Boolean(posts.length > 0);

  let authoredPosts = (
    <div className={classes.authoredPosts}>
      {posts.map((post, index) => (
        <Typography variant="body2" color="textSecondary">
          <span className={classes.index}>{`${index + 1}.`}</span>
          <LinkTo
            href={`/blog?postSlug=${post.slug}`}
            as={`/blog/posts/${post.slug}`}
          >
            {post.title}
          </LinkTo>
        </Typography>
      ))}
    </div>
  );

  return (
    <Card className={`author-preview ${classes.root}`}>
      <CardHeader
        title={
          <LinkTo hoverNone href={`/blog/authors?authorSlug=${username}`} as={`/blog/authors/${username}`}>{`${firstName} ${lastName}`}</LinkTo>
        }
        subheader={username}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title={`${firstName} ${lastName}`}
      />
      <CardContent>
        <Typography variant="button" gutterBottom color="textSecondary" className={classes.postsHeader}>Latest works</Typography>
        {authoredPosts}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(AuthorPreview);
