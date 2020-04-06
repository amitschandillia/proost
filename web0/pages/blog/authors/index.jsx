import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import withApollo from '../../../apollo';
import AuthorsList from '../../../components/blog/AuthorsList';
import Layout from '../../../components/Layout';
import PageBody from '../../../components/PageBody';
import SingleAuthor from '../../../components/blog/SingleAuthor';

const styles = (theme) => ({
  root: {},
});

const Authors = (props) => {
  const {
    classes,
    language,
    query: { authorSlug },
  } = props;

  let title, description, pageURL;

  if(!authorSlug) {
    title = 'Authors | Project Proost';
    description = 'This is the description for the Authors page';
    pageURL = `${process.env.BASE_URL}/blog/authors`;
  } else {
    pageURL = `${process.env.BASE_URL}/blog/authors/${authorSlug}`;
  }

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        {authorSlug && <SingleAuthor authorSlug={authorSlug} pageURL={pageURL} />}
        {!authorSlug && <AuthorsList pageURL={pageURL} />}
      </PageBody>
    </Layout>
  );
};

Authors.getInitialProps = async ({ query }) => {
  return {query};
};

Authors.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Authors));
