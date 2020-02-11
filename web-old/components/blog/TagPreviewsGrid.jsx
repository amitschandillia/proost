import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';

import TagPreview from './TagPreview';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
});

const TagPreviewsGrid = (props) => {
  const removeGridGaps = () => {
    const tagPreviewContainers = document.getElementsByClassName('tag-preview-container');
    const itemCount = tagPreviewContainers.length;
    if (itemCount && itemCount > 0) {
      let n = 0;
      while (n < itemCount - 1) {
        if (tagPreviewContainers[n].offsetTop === tagPreviewContainers[n + 1].offsetTop) {
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
          const elemAbove = tagPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          const elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = tag-preview element inside elemAbove
          const elemAbovePreview = elemAbove.getElementsByClassName('tag-preview')[0];
          // apb = ap's height
          const elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          const gap = -Math.abs(elemAboveHeight - elemAbovePreviewHeight - 16);
          tagPreviewContainers[col + row].style.marginTop = `${gap}px`;
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
    tags,
    pageURL,
  } = props;

  return (
    <Grid container spacing={2} direction="row" id="tags-container">
      {tags.map((tag) => {
        let thumbnailImg;
        if(tag.thumbnail) {
          thumbnailImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${tag.thumbnail.hash}${tag.thumbnail.ext}`;
        } else {
          thumbnailImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/tag/thumbnail.jpg`;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="tag-preview-container">
            <TagPreview
              slug={tag.slug}
              name={tag.name}
              thumbnail={thumbnailImg}
              posts={tag.posts}
              pageURL={pageURL}
            />
          </Grid>
        )
      })}
    </Grid>
  );
};

TagPreviewsGrid.propTypes = {
  tags: PropTypes.arrayOf({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(TagPreviewsGrid);
