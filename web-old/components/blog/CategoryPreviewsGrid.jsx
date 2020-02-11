import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { useLayoutEffect } from 'react';

import CategoryPreview from './CategoryPreview';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
});

const CategoryPreviewsGrid = (props) => {
  const removeGridGaps = () => {
    const categoryPreviewContainers = document.getElementsByClassName('category-preview-container');
    const itemCount = categoryPreviewContainers.length;
    if (itemCount && itemCount > 0) {
      let n = 0;
      while (n < itemCount - 1) {
        if (categoryPreviewContainers[n].offsetTop === categoryPreviewContainers[n + 1].offsetTop) {
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
          const elemAbove = categoryPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          const elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = category-preview element inside elemAbove
          const elemAbovePreview = elemAbove.getElementsByClassName('category-preview')[0];
          // apb = ap's height
          const elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          const gap = -Math.abs(elemAboveHeight - elemAbovePreviewHeight - 16);
          categoryPreviewContainers[col + row].style.marginTop = `${gap}px`;
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
    categories,
    pageURL,
  } = props;

  return (
    <Grid container spacing={2} direction="row" id="categories-container">
      {categories.map((category) => {
        let thumbnailImg;
        if(category.thumbnail) {
          thumbnailImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${category.thumbnail.hash}${category.thumbnail.ext}`;
        } else {
          thumbnailImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/category/thumbnail.jpg`;
        }

        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className="category-preview-container">
            <CategoryPreview
              slug={category.slug}
              name={category.name}
              thumbnail={thumbnailImg}
              posts={category.posts}
              pageURL={pageURL}
            />
          </Grid>
        )
      })}
    </Grid>
  );
};

CategoryPreviewsGrid.propTypes = {
  categories: PropTypes.arrayOf({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      ext: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withStyles(styles)(CategoryPreviewsGrid);
