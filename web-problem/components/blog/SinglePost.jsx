import { useQuery } from '@apollo/react-hooks';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
// import shortNumber from 'short-number';

import getPostQuery from '../../apollo/schemas/getPostQuery.graphql';
import Loading from './Loading';

const styles = () => ({
  root: {},
});

export const GET_POST = getPostQuery;

const renderers = {
  paragraph: (props) => <Typography variant="body2" gutterBottom {...props} />,
};

const SinglePost = (props) => {
  const {
    classes,
    slug,
    closeMenu,
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

  // useEffect(() => {
  //   closeMenu();
  //   return () => closeMenu();
  // });

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
    author: {
      username,
      firstName,
      lastName,
    },
  }] = posts;

  let bannerImg;
  if (banner) {
    bannerImg = `https://i.${process.env.THIS_DOMAIN_LONG}/d/${banner.hash}${banner.ext}`;
  } else {
    bannerImg = `https://www.${process.env.THIS_DOMAIN_LONG}/_f/images/defaults/post/banner.jpg`;
  }

  // const postViews = shortNumber(views);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={excerpt} key="postDescription" />
      </Head>
      <Grid item className={classes.root}>
        <h1>{title}</h1>
        <h2>{secondaryTitle}</h2>
        <h3>
          {readTime}
          {' '}
minutes
        </h3>
        <h5>{bannerImg}</h5>
        <h6>
By:
          {`${firstName} ${lastName} (${username})`}
        </h6>
        <p>
          <VisibilityIcon />
          {' '}
          {views}
        </p>
        <ReactMarkdown source={body} renderers={renderers} />
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(SinglePost));
