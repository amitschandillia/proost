import Grid from '@material-ui/core/Grid';
import AuthorPreview from './AuthorPreview';
import withStyles from '@material-ui/core/styles/withStyles';
import { useLayoutEffect } from 'react';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
});

const AuthorPreviewsGrid = (props) => {

  const removeGridGaps = () => {
    const authorPreviewContainers = document.getElementsByClassName('author-preview-container');
    const itemCount = authorPreviewContainers.length;
    if(itemCount && itemCount > 0) {
      let n = 0;
      while(n < itemCount - 1) {
        if(authorPreviewContainers[n].offsetTop === authorPreviewContainers[n + 1].offsetTop)  { n++; }
        else { break; }
      }
      let itemsPerRow = n + 1;

      for (let col = 0; col <= itemsPerRow - 1; col++) {
        var row = itemsPerRow;
        while((col + row) < itemCount) {
          // logic to remove gaps
          // a = element above
          var elemAbove = authorPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          var elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = author-preview element inside elemAbove
          var elemAbovePreview = elemAbove.getElementsByClassName('author-preview')[0];
          // apb = ap's height
          var elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          var gap = -Math.abs( elemAboveHeight - elemAbovePreviewHeight - 16);
          authorPreviewContainers[col + row].style.marginTop = `${gap}px`;
          row += itemsPerRow;
        }
      }
    }
  };

  const delayedResizeTrigger = (func) => {
    let timer;
    return function(event){
      if(timer) clearTimeout(timer);
      timer = setTimeout(func, 100, event);
    };
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', delayedResizeTrigger((e) => {
      removeGridGaps();
    }));
    window.addEventListener('scroll', delayedResizeTrigger((e) => {
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
    classes,
    users,
  } = props;

  return (
    <Grid container spacing={2} direction="row" id="authors-container">
      {users.map((user) => {
        if(user.posts.length > 0) {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={`author-preview-container`}>
              <AuthorPreview
                username={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                thumbnail={`https://i.${process.env.THIS_DOMAIN_LONG}/d/${user.thumbnail.hash}${user.thumbnail.ext}`}
                posts={user.posts}
              />
            </Grid>
          );
        }
      })}
    </Grid>
  );
};

export default withStyles(styles)(AuthorPreviewsGrid);
