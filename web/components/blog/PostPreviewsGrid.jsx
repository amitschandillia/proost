import { useQuery } from '@apollo/react-hooks';
import { NetworkStatus } from 'apollo-client';
import Grid from '@material-ui/core/Grid';
import PostPreview from './PostPreview';
import withStyles from '@material-ui/core/styles/withStyles';
import { useLayoutEffect } from 'react';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(6, 2),
    width: '100%',
  },
});

const PostPreviewsGrid = (props) => {

  const removeGridGaps = () => {
    const postPreviewContainers = document.getElementsByClassName('post-preview-container');
    const itemCount = postPreviewContainers.length;
    if(itemCount && itemCount > 0) {
      let n = 0;
      while(n < itemCount - 1) {
        if(postPreviewContainers[n].offsetTop === postPreviewContainers[n + 1].offsetTop)  { n++; }
        else { break; }
      }
      let itemsPerRow = n + 1;

      for (let col = 0; col <= itemsPerRow - 1; col++) {
        var row = itemsPerRow;
        while((col + row) < itemCount) {
          // logic to remove gaps
          // a = element above
          var elemAbove = postPreviewContainers[col + row - itemsPerRow];
          // p = elemAbove's height minus padding
          var elemAboveHeight = elemAbove.getBoundingClientRect().height;
          // ap = post-preview element inside elemAbove
          var elemAbovePreview = elemAbove.getElementsByClassName('post-preview')[0];
          // apb = ap's height
          var elemAbovePreviewHeight = elemAbovePreview.getBoundingClientRect().height;
          // gap = apb - ap
          var gap = -Math.abs( elemAboveHeight - elemAbovePreviewHeight - 16);
          postPreviewContainers[col + row].style.marginTop = `${gap}px`;
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
    posts,
  } = props;

  return (
    <Grid container spacing={2} direction="row" id="posts-container">
      {posts.map((post) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={`post-preview-container`}>
            <PostPreview
              title={post.title}
              slug={post.slug}
              urlPost={`https://www.schandillia.com/blog/posts/${post.slug}`}
              urlAuthor={`https://www.schandillia.com/blog/authors/${post.author.username}`}
              excerpt={post.excerpt}
              thumbnail={`https://i.schandillia.com/d/${post.thumbnail.hash}${post.thumbnail.ext}`}
              author={`${post.author.firstName} ${post.author.lastName}`}
              username={post.author.username}
              category={post.category}
              tags={post.tags}
              readTime={post.readTime}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default withStyles(styles)(PostPreviewsGrid);
