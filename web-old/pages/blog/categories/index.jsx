import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';

import withApollo from '../../../apollo';
import CategoriesList from '../../../components/blog/CategoriesList';
import Layout from '../../../components/Layout';
import PageBody from '../../../components/PageBody';
import SingleCategory from '../../../components/blog/SingleCategory';

const styles = (theme) => ({
  root: {},
});

const Categories = (props) => {
  const {
    classes,
    language,
    query: { categorySlug },
  } = props;

  let title, description, pageURL;

  if(!categorySlug) {
    title = 'Categories | Project Proost';
    description = 'This is the description for the Categories page';
    pageURL = `${process.env.BASE_URL}/blog/categories`;
  } else {
    pageURL = `${process.env.BASE_URL}/blog/categories/${categorySlug}`;
  }

  return (
    <Layout
      title={title}
      description={description}
      pageURL={pageURL}
    >
      <PageBody>
        {categorySlug && <SingleCategory categorySlug={categorySlug} />}
        {!categorySlug && <CategoriesList />}
      </PageBody>
    </Layout>
  );
};

Categories.getInitialProps = async ({ query }) => {
  return {query};
};

Categories.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(withApollo(Categories));
