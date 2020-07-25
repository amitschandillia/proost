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
import VisibilityIcon from '@material-ui/icons/Visibility';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { connect } from 'react-redux';

import abbreviateCount from '../../utils/abbreviate-count';
import shouldBypassLogin from '../../utils/should-bypass-login';
import LinkTo from '../LinkTo';

import axios from 'axios';

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
    id,
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
    likedBy,
    userInfo,
    openSignInDialog,
    pageURL,
  } = props;

  let readersInit = [];
  if(likedBy) {
    if(likedBy.readers) {
      readersInit = likedBy.readers.slice();
    }
  }

  const [likedByArr, setLikedByArr] = useState({
    readers: readersInit,
  });

  // console.log('LIKEDBYARR:', likedByArr);
  // console.log('POST ID:', id);

  let liked = 'inherit';
  let isLoggedIn = false;

  if (userInfo) {
    if (userInfo.userID) {
      isLoggedIn = true;
    }
  }

  if (isLoggedIn) {
    if (likedByArr.readers.includes(userInfo.userID)) {
      liked = 'error';
    }
  }

  const handleClickOpen = async () => {
    // If login should be bypassed, proceed to login without auth
    // otherwise open sign in dialog
    let isUserLoggedIn = await shouldBypassLogin(pageURL);
    isUserLoggedIn = typeof isUserLoggedIn === 'undefined' ? true : isUserLoggedIn;
    if (!isUserLoggedIn) {
      // Failed to auto-login
      openSignInDialog();
    }
  };

  const handleLike = async () => {
    if (isLoggedIn) {
      // call axios query to update db
      const auth = {Authorization: `Bearer ${process.env.STRAPI_TOKEN}`}
      const query = `
        mutation updatePost ($id: ID!, $title: String!){
          updatePost(input: {where: {id: $id}, data: {title: $title}}){
            post{
              id
              title
            }
          }
        }
      `
      const variables = {
        "id": "5ddf9ff327ee7b0915f0ac91",
        "title": "Amit Nemo enim ipsam voluptatem quia voluptas sit aspernatur"
      }
      axios.post(
        process.env.CMS,
        {query: query},
        {variables: variables},
        {headers: auth},
      ).then((result) => {
        console.log('RESULT', result.data);
      }).catch((error) => {
        console.log('ERROR', error);
      });

      let readersArr = [];
      if (likedByArr.readers.includes(userInfo.userID)) {
        readersArr = likedByArr.readers.filter((user) => user !== userInfo.userID);
      } else {
        readersArr = likedByArr.readers.slice();
        readersArr.push(userInfo.userID);
      }
      setLikedByArr({
        readers: readersArr,
      });
    } else {
      await handleClickOpen();
    }
  };

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
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color={liked} />
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
  userInfo: PropTypes.shape({
    userID: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  excerpt: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  readTime: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  likedBy: PropTypes.shape({
    readers: PropTypes.array.isRequired,
  }).isRequired,
  category: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  openSignInDialog: PropTypes.func.isRequired,
  pageURL: PropTypes.string.isRequired,
};

// export default withStyles(styles)(PostPreview);

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  language: state.language,
});

const mapDispatchToProps = (dispatch) => ({
  openSignInDialog: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSUBMITEMAILVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
    dispatch({ type: 'OPENSIGNINDIALOG', payload: true });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGCREDENTIALSERROR', payload: 'none' });
    dispatch({ type: 'FLAGEPASSWORDERROR', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostPreview));
