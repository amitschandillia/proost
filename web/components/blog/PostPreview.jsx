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
import LinkTo from '../LinkTo';
import Grid from '@material-ui/core/Grid';
import LabelIcon from '@material-ui/icons/Label';

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
  content: {
    paddingBottom: 0,
  },
  link: {
    color: 'dimgrey',
    textDecoration: 'none',
  },
  title: {
    fontWeight: 'bold',
  },
  excerpt: {
    paddingBottom: theme.spacing(2),
  },
  divider: {
    color: theme.palette.grey[400],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  tags: {
    marginTop: theme.spacing(1),
  },
  icon: {
    verticalAlign: 'top',
    marginRight: theme.spacing(1),
  },
  tagLink: {
    // whiteSpace: 'nowrap',
  },
});

const PostPreview = (props) => {
  const {
    classes,
    title,
    slug,
    username,
    excerpt,
    thumbnail,
    author,
    category,
    tags,
    readTime,
  } = props;

  return (
    <Card className={`post-preview ${classes.root}`}>
      <CardHeader
        title={
          <LinkTo hoverNone href={`/blog?postSlug=${slug}`} as={`/blog/posts/${slug}`}>{title}</LinkTo>
        }
        subheader={
          <LinkTo hoverNone href={`/blog/authors?authorSlug=${username}`} as={`/blog/authors/${username}`}>{author}</LinkTo>
        }
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title={title}
      />
    <CardContent className={classes.content}>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.excerpt}>
          {excerpt}
        </Typography>
        <Typography variant="button">
          <LinkTo hoverNone href="/about">{category.name}</LinkTo>
        </Typography>
        <Typography variant="button" className={classes.divider}>{'|'}</Typography>
        <Typography variant="button" color="textSecondary" style={{textTransform: 'inherit'}}>
          {`${readTime} minutes`}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="div" className={classes.tags}>
          <LabelIcon className={classes.icon} />
          {tags.map((tag, index) => {
            let delimiter = ', ';
            if(index === tags.length - 1) delimiter = '';
            return (
              <span className={classes.tagLink}>
                <LinkTo href="/about">
                  {tag.name}
                </LinkTo>
                {delimiter}
              </span>
            );
          })}
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
