import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import withApollo from '../../../apollo';
import TagsList from '../../../components/blog/TagsList';
import Layout from '../../../components/Layout';
import PageBody from '../../../components/PageBody';
import SingleTag from '../../../components/blog/SingleTag';

const styles = (theme) => ({
  root: {},
});

const Tags = (props) => {
  const {
    classes,
    language,
    query: { tagSlug },
  } = props;

  let title, description, pageURL;

  if(!tagSlug) {
    title = 'Tags | Project Proost';
    description = 'This is the description for the Tags page';
    pageURL = `${process.env.BASE_URL}/blog/tags`;
  } else {
    pageURL = `${process.env.BASE_URL}/blog/tags/${tagSlug}`;
  }

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        {tagSlug && <SingleTag tagSlug={tagSlug} pageURL={pageURL} />}
        {!tagSlug && <TagsList pageURL={pageURL} />}
      </PageBody>
    </Layout>
  );
};

Tags.getInitialProps = async ({ query }) => {
  return {query};
};

Tags.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Tags));
