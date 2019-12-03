import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';

import AuthorPreview from './AuthorPreview';

const styles = () => ({
  root: {
    // padding: theme.spacing(6, 2),
    // width: '100%',
  },
});

const AuthorPreviewsGrid = (props) => {
  const removeGridGaps = () => {
    const authorPreviewContainers = document.getElementsByClassName('author-preview-container');
    const itemCount = authorPreviewContainers.length;
    if (itemCount && itemCount > 0) {
      let n = 0;
      while (n < itemCount - 1) {
        if (authorPreviewContainers[n].offsetTop === authorPreviewContainers[n + 1].offsetTop) {
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
          const elemAbove = authorPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          const elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = author-preview element inside elemAbove
          const elemAbovePreview = elemAbove.getElementsByClassName('author-preview')[0];
          // apb = ap's height
          const elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          const gap = -Math.abs(elemAboveHeight - elemAbovePreviewHeight - 16);
          authorPreviewContainers[col + row].style.marginTop = `${gap}px`;
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
    users,
  } = props;

  return (
    <Grid container spacing={2} direction="row" id="authors-container">
      {users.map((user) => {
        let thumbnailImg;
        if(user.thumbnail) {
          thumbnailImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${user.thumbnail.hash}${user.thumbnail.ext}`;
        } else {
          thumbnailImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/author/thumbnail.jpg`;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="author-preview-container">
            <AuthorPreview
              username={user.username}
              firstName={user.firstName}
              lastName={user.lastName}
              thumbnail={thumbnailImg}
              posts={user.posts}
            />
          </Grid>
        )
      })}
    </Grid>
  );
};

AuthorPreviewsGrid.propTypes = {
  users: PropTypes.arrayOf({
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(AuthorPreviewsGrid);
