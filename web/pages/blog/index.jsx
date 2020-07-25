import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import withApollo from '../../apollo';
import PostsList from '../../components/blog/PostsList';
import Layout from '../../components/Layout';
import PageBody from '../../components/PageBody';
import SinglePost from '../../components/blog/SinglePost';

import SearchedPostsList from '../../components/blog/SearchedPostsList';

import Banner from '../../components/Banner';
import Typography from '@material-ui/core/Typography';

import abbreviateCount from '../../utils/abbreviate-count';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LinkTo from '../../components/LinkTo';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LabelIcon from '@material-ui/icons/Label';

const tShadow = '2px 4px 3px rgba(0,0,0,0.3)';

const styles = (theme) => ({
  root: {},
  title: {
    color: theme.palette.title.default,
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h4.fontSize,
    },
    textShadow: tShadow,
  },
  secondaryTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.h5.fontSize,
    },
    fontWeight: theme.typography.fontWeightLight,
    textShadow: tShadow,
  },
  icon: {
    verticalAlign: 'top',
    marginRight: theme.spacing(1),
  },
  divider: {
    color: theme.palette.grey[400],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  details: {
    marginTop: theme.spacing(5),
    textAlign: 'center',
    textShadow: tShadow,
  },
  author: {
    marginTop: theme.spacing(2)
  },
  authorName: {
    textTransform: 'inherit',
    textShadow: tShadow,
  },
  category: {
    textShadow: tShadow,
  },
  avatar: {
    marginRight: theme.spacing(1),
  },
  tagLink: {},
});

const Blog = (props) => {
  const {
    classes,
    language,
    postBanner,
    postTitle,
    postSecondaryTitle,
    postReadTime,
    postViews,
    postAuthorFN,
    postAuthorLN,
    postAuthorUN,
    postAuthorThumbnail,
    postCatName,
    postCatSlug,
    postTags,
    query: { postSlug, search },
  } = props;
  let title, description, pageURL;

  let parsedTags = [];
  if(postTags) {
    parsedTags = JSON.parse(postTags);
  }

  if(!postSlug) {
    title = 'Blog | Project Proost';
    description = 'This is the description for the Blog page';
    pageURL = `${process.env.BASE_URL}/blog`;
  } else {
    pageURL = `${process.env.BASE_URL}/blog/posts/${postSlug}`;
  }
  if(search) {
    title = 'Blog Search | Project Proost';
    description = 'This is search';
    pageURL = `${process.env.BASE_URL}/blog?search=${search}`;
  }

  return (
    <>
      {search &&
        <Layout
          title={title ? title : undefined}
          description={description ? description : undefined}
          pageURL={pageURL}
        >
          <PageBody>
            <SearchedPostsList pageURL={pageURL} searchTerm={search} />
          </PageBody>
        </Layout>
      }
      {postSlug &&
      <Layout
        title={title ? title : undefined}
        description={description ? description : undefined}
        pageURL={pageURL}
        transparent
      >
        <Banner image={postBanner}>
          <Typography
            variant="h2"
            component="h1"
            className={classes.title}
            align="center"
          >
            {postTitle}
          </Typography>
          <Typography
            variant="h4"
            component="p"
            className={classes.secondaryTitle}
            align="center"
          >
            {postSecondaryTitle}
          </Typography>
          <div className={classes.details}>
            <LinkTo hoverNone href={`/blog/categories?categorySlug=${postCatSlug}`} as={`/blog/categories/${postCatSlug}`}>
              <Typography variant="button" className={classes.category}>
                {postCatName}
              </Typography>
            </LinkTo>
            <Typography variant="button" className={classes.divider}>|</Typography>
            <Typography variant="button" style={{ textTransform: 'inherit' }}>
              <VisibilityIcon className={classes.icon} />
              {abbreviateCount(postViews, 1)}
            </Typography>
            <Typography variant="button" className={classes.divider}>|</Typography>
            <Typography variant="button" style={{ textTransform: 'inherit' }}>
              {`${postReadTime} minutes`}
            </Typography>
          </div>
          <Grid
            container
            justify="center"
            alignItems="center"
          >
            <LabelIcon className={classes.icon} />
            {parsedTags.map((tag, index) => {
              let delimiter = ',';
              if (index === parsedTags.length - 1) delimiter = '';
              return (
                <span className={classes.tagLink} style={{marginRight: index === parsedTags.length - 1 ? '0rem' : '0.25rem'}}>
                  <LinkTo hoverNone href={`/blog/tags?tagSlug=${tag.slug}`} as={`/blog/tags/${tag.slug}`}>
                    {tag.name}
                  </LinkTo>
                  {delimiter}
                </span>
              );
            })}
          </Grid>
          <Grid
            container
            justify="center"
            alignItems="center"
            className={classes.author}
          >
            <Grid item>
              <Avatar alt={`${postAuthorFN}${postAuthorLN}`} src={postAuthorThumbnail} className={classes.avatar} />
            </Grid>
            <Grid item>
              <LinkTo hoverNone href={`/blog/authors?authorSlug=${postAuthorUN}`} as={`/blog/authors/${postAuthorUN}`}>
                <Typography variant="button" className={classes.authorName}>
                  {postAuthorFN}
                  {' '}
                  {postAuthorLN}
                </Typography>
              </LinkTo>
            </Grid>
          </Grid>
        </Banner>
        <PageBody>
          <SinglePost slug={postSlug} pageURL={pageURL} />
        </PageBody>
      </Layout>}
      {!postSlug &&
      <Layout
        title={title ? title : undefined}
        description={description ? description : undefined}
        pageURL={pageURL}
      >
        <PageBody>
          <PostsList pageURL={pageURL} />
        </PageBody>
      </Layout>}
    </>
  );
};

Blog.getInitialProps = async ({ query }) => {
  return {query};
};

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

// export default withStyles(styles)(withApollo(Blog));

const mapStateToProps = (state) => ({
  postBanner: state.postBanner,
  postTitle: state.postTitle,
  postSecondaryTitle: state.postSecondaryTitle,
  postReadTime: state.postReadTime,
  postViews: state.postViews,
  postAuthorFN: state.postAuthorFN,
  postAuthorLN: state.postAuthorLN,
  postAuthorUN: state.postAuthorUN,
  postAuthorThumbnail: state.postAuthorThumbnail,
  postCatName: state.postCatName,
  postCatSlug: state.postCatSlug,
  postTags: state.postTags,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(withApollo(Blog)));
