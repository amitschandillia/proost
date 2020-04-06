import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import PostPreview from './PostPreview';

const styles = () => ({
  root: {
    // padding: theme.spacing(6, 2),
    // width: '100%',
  },
});

const PostPreviewsGrid = (props) => {
  const removeGridGaps = () => {
    const postPreviewContainers = document.getElementsByClassName('post-preview-container');
    const itemCount = postPreviewContainers.length;
    if (itemCount && itemCount > 0) {
      let n = 0;
      while (n < itemCount - 1) {
        if (postPreviewContainers[n].offsetTop === postPreviewContainers[n + 1].offsetTop) {
          n += 1;
        } else {
          break;
        }
      }
      const itemsPerRow = n + 1;

      for (let col = 0; col <= itemsPerRow - 1; col++) {
        let row = itemsPerRow;
        while ((col + row) < itemCount) {
          // logic to remove gaps
          // a = element above
          const elemAbove = postPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          const elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = post-preview element inside elemAbove
          const elemAbovePreview = elemAbove.getElementsByClassName('post-preview')[0];
          // apb = ap's height
          const elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          const gap = -Math.abs(elemAboveHeight - elemAbovePreviewHeight - 16);
          postPreviewContainers[col + row].style.marginTop = `${gap}px`;
          row += itemsPerRow;
        }
      }
    }
  };

  const delayedResizeTrigger = (func) => {
    let timer;
    const timerFunc = (event) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
    return timerFunc;
  };

  useLayoutEffect(() => {
    window.addEventListener('resize', delayedResizeTrigger(() => {
      removeGridGaps();
    }));
    window.addEventListener('scroll', delayedResizeTrigger(() => {
      removeGridGaps();
    }));
    removeGridGaps();
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('resize', delayedResizeTrigger);
      window.removeEventListener('scroll', delayedResizeTrigger);
    };
  }, []);

  const {
    posts,
    pageURL,
    userInfo,
    language,
    postsLiked,
    updateLikes,
  } = props;

  let isLoggedIn = false;

  if (userInfo) {
    if (userInfo.userID) {
      isLoggedIn = true;
    }
  }

  const likedPostsArr = [];

  if (isLoggedIn) {
    posts.forEach((post) => {
      // check if userInfo.userID exists in likedBy.readers
      if (post.likedBy) {
        if (post.likedBy.readers) {
          if (post.likedBy.readers.includes(userInfo.userID)) {
            // if yes, push {post.id, 1} to likedPostsArr array
            const likedPostId = post.id;
            likedPostsArr.push({
              likedPostId,
              liked: 1,
            });
          }
        }
      }
    });
    // assign likedPostsArr to likedPosts redux state:
    console.log('[...likedPostsArr]', [...likedPostsArr]);
    updateLikes([...likedPostsArr]); // this line gives invariant error
  }

  return (
    <Grid container spacing={2} direction="row" id="posts-container">
      {posts.map((post) => {
        let thumbnailImg;
        if (post.thumbnail) {
          thumbnailImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${post.thumbnail.hash}${post.thumbnail.ext}`;
        } else {
          thumbnailImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/post/thumbnail.jpg`;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="post-preview-container">
            <PostPreview
              id={post.id}
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
              thumbnail={thumbnailImg}
              author={`${post.author.firstName} ${post.author.lastName}`}
              username={post.author.username}
              category={post.category}
              tags={post.tags}
              readTime={post.readTime}
              views={post.views}
              likedBy={post.likedBy}
              pageURL={pageURL}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

PostPreviewsGrid.propTypes = {
  posts: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }).isRequired,
    thumbnail: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
    }).isRequired,
    category: PropTypes.shape({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    tags: PropTypes.arrayOf({
      slug: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
  language: state.language,
  postsLiked: state.postsLiked,
});

const mapDispatchToProps = (dispatch) => ({
  updateLikes: (postsArr) => {
    dispatch({ type: 'CHANGELIKEDPOSTS', payload: [...postsArr] });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(PostPreviewsGrid));
