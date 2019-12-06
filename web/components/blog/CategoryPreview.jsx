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
import PropTypes from 'prop-types';

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
  postsHeader: {
    fontWeight: 'bold',
  },
  categorizedPosts: {
    paddingTop: theme.spacing(2),
  },
  index: {
    fontWeight: 'bold',
    marginRight: theme.spacing(1),
  },
});

const CategoryPreview = (props) => {
  const {
    classes,
    slug,
    name,
    thumbnail,
    posts,
    pageURL,
  } = props;

  let postsElem;
  if(posts.length > 0) {
    postsElem = posts.map((post, index) => (
      <Typography variant="body2" color="textSecondary">
        <span className={classes.index}>{`${index + 1}.`}</span>
        <LinkTo
          href={`/blog?postSlug=${post.slug}`}
          as={`/blog/posts/${post.slug}`}
        >
          {post.title}
        </LinkTo>
      </Typography>
    ));
  } else {
    postsElem = <Typography variant="body2" color="textSecondary">No posts published yet...</Typography>;
  }

  const categorizedPosts = (
    <div className={classes.categorizedPosts}>
      {postsElem}
    </div>
  );

  return (
    <Card className={`category-preview ${classes.root}`}>
      <CardHeader
        title={
          <LinkTo hoverNone href={`/blog/categories?categorySlug=${slug}`} as={`/blog/categories/${slug}`}>{name}</LinkTo>
        }
        subheader={slug}
      />
      <CardMedia
        className={classes.media}
        image={thumbnail}
        title={name}
      />
      <CardContent>
        <Typography variant="button" gutterBottom color="textSecondary" className={classes.postsHeader}>Latest works</Typography>
        {categorizedPosts}
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

CategoryPreview.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    media: PropTypes.string,
    title: PropTypes.string,
    postsHeader: PropTypes.string,
    categorizedPosts: PropTypes.string,
    index: PropTypes.string,
    link: PropTypes.string,
  }).isRequired,
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  posts: PropTypes.arrayOf({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(CategoryPreview);
