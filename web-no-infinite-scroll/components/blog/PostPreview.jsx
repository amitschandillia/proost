import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

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
});

const PostPreview = (props) => {
  const {
    classes,
    title,
    urlPost,
    urlAuthor,
    excerpt,
    thumbnail,
    author,
  } = props;

  return (
    <Card className={`post-preview ${classes.root}`}>
      <CardHeader
        title={
          <a className={`${classes.link} ${classes.title}`} href={urlPost}>{title}</a>
        }
        subheader={
          <a className={`${classes.link} ${classes.author}`} href={urlAuthor}>{author}</a>
        }
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {excerpt}
        </Typography>
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
}

export default withStyles(styles)(PostPreview);
