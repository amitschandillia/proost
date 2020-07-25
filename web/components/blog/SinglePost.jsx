import { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Head from 'next/head';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';

import getPostQuery from '../../apollo/schemas/getPostQuery.graphql';
import Loading from './Loading';
import RenderedP from '../RenderedP';
import RenderedLink from '../RenderedLink';
import RenderedImg from '../RenderedImg';
import RenderedBlockquote from '../RenderedBlockquote';
import RenderedH from '../RenderedH';
import RenderedTCell from '../RenderedTCell';
import RenderedTRow from '../RenderedTRow';
import RenderedTBody from '../RenderedTBody';
import RenderedTHead from '../RenderedTHead';
import RenderedTable from '../RenderedTable';

import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  root: {
    width: 'inherit',
    marginTop: -theme.spacing(4),
  },
});

export const GET_POST = getPostQuery;

const renderers = {
  paragraph: (props) => (
    <RenderedP
      rendererProps={props}
    />
  ),
  link: (props) => (
    <RenderedLink
      rendererProps={props}
    />
  ),
  image: (props) => (
    <RenderedImg
      rendererProps={props}
    />
  ),
  blockquote: (props) => (
    <RenderedBlockquote
      rendererProps={props}
    />
  ),
  heading: (props) => (
    <RenderedH
      rendererProps={props}
    />
  ),
  tableCell: (props) => (
    <RenderedTCell
      rendererProps={props}
    />
  ),
  tableRow: (props) => (
    <RenderedTRow
      rendererProps={props}
    />
  ),
  tableBody: (props) => (
    <RenderedTBody
      rendererProps={props}
    />
  ),
  tableHead: (props) => (
    <RenderedTHead
      rendererProps={props}
    />
  ),
  table: (props) => (
    <RenderedTable
      rendererProps={props}
    />
  ),
};

const SinglePost = (props) => {
  const {
    classes,
    slug,
    closeMenu,
    updatePostData,
    pageURL,
  } = props;
  const {
    loading,
    error,
    data,
  } = useQuery(
    GET_POST,
    {
      variables: { where: { slug } },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we'd know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => closeMenu());

  if (error) return <div>There was an error!</div>;
  if (loading) return <Loading />;

  const { posts } = data;
  const [{
    title,
    secondaryTitle,
    excerpt,
    body,
    readTime,
    views,
    banner,
    category,
    tags,
    author: {
      username,
      firstName,
      lastName,
      thumbnail,
    },
  }] = posts;

  let bannerImg;
  if(banner) {
    bannerImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${banner.hash}${banner.ext}`;
  } else {
    bannerImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/post/banner.jpg`;
  }

  let thumbnailUrl;
  if(thumbnail) {
    thumbnailUrl = 'https://i.schandillia.com/d/' + thumbnail.hash + thumbnail.ext;
  } else {
    thumbnailUrl = '/_f/images/defaults/author/thumbnail.jpg';
  }

  updatePostData(
    bannerImg,
    title,
    secondaryTitle,
    readTime,
    views,
    firstName,
    lastName,
    username,
    thumbnailUrl,
    category.name,
    category.slug,
    JSON.stringify(tags),
  );

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <Container>
          <ReactMarkdown source={body} renderers={renderers} />
        </Container>
      </Grid>
    </>
  );
};

SinglePost.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    name: PropTypes.string,
    more: PropTypes.string,
    button: PropTypes.string,
  }).isRequired,
  slug: PropTypes.string.isRequired,
};

// export default withStyles(styles)(SinglePost);

const mapStateToProps = (state) => ({
  // ip: state.ip,
});

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => {
    dispatch({ type: 'OPENBLOGMENU', payload: false });
  },
  updatePostData: (
    postBanner,
    postTitle,
    postSecondaryTitle,
    postReadTime,
    postViews,
    firstName,
    lastName,
    username,
    thumbnailUrl,
    catName,
    catSlug,
    postTags,
  ) => {
    dispatch({ type: 'UPDATEPOSTBANNER', payload: postBanner });
    dispatch({ type: 'UPDATEPOSTTITLE', payload: postTitle });
    dispatch({ type: 'UPDATEPOSTSECONDARYTITLE', payload: postSecondaryTitle });
    dispatch({ type: 'UPDATEPOSTREADTIME', payload: postReadTime });
    dispatch({ type: 'UPDATEPOSTVIEWS', payload: postViews });
    dispatch({ type: 'UPDATEPOSTAUTHORFN', payload: firstName });
    dispatch({ type: 'UPDATEPOSTAUTHORLN', payload: lastName });
    dispatch({ type: 'UPDATEPOSTAUTHORUN', payload: username });
    dispatch({ type: 'UPDATEPOSTAUTHORTHUMBNAIL', payload: thumbnailUrl });
    dispatch({ type: 'UPDATEPOSTCATNAME', payload: catName });
    dispatch({ type: 'UPDATEPOSTCATSLUG', payload: catSlug });
    dispatch({ type: 'UPDATEPOSTTAGS', payload: postTags });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SinglePost));
