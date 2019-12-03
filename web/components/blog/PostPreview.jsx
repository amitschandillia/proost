import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LabelIcon from '@material-ui/icons/Label';
import ShareIcon from '@material-ui/icons/Share';
import PropTypes from 'prop-types';
import VisibilityIcon from '@material-ui/icons/Visibility';

import abbreviateCount from '../../utils/abbreviate-count';
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
    views,
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
          <LinkTo hoverNone href={`/blog/categories?categorySlug=${category.slug}`} as={`/blog/categories/${category.slug}`}>{category.name}</LinkTo>
        </Typography>
        <Typography variant="button" className={classes.divider}>|</Typography>
        <Typography variant="button" color="textSecondary" style={{ textTransform: 'inherit' }}>
          <VisibilityIcon className={classes.icon} />
          {abbreviateCount(views, 1)}
        </Typography>
        <Typography variant="button" className={classes.divider}>|</Typography>
        <Typography variant="button" color="textSecondary" style={{ textTransform: 'inherit' }}>
          {`${readTime} minutes`}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" component="div" className={classes.tags}>
          <LabelIcon className={classes.icon} />
          {tags.map((tag, index) => {
            let delimiter = ', ';
            if (index === tags.length - 1) delimiter = '';
            return (
              <span className={classes.tagLink}>
                <LinkTo hoverNone href={`/blog/tags?tagSlug=${tag.slug}`} as={`/blog/tags/${tag.slug}`}>
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
};

PostPreview.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    media: PropTypes.string,
    content: PropTypes.string,
    link: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    divider: PropTypes.string,
    tags: PropTypes.string,
    icon: PropTypes.string,
    tagLink: PropTypes.string,
  }).isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  category: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(PostPreview);
