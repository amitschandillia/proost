import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import LinkTo from '../components/LinkTo';
import Layout from '../components/Layout';
import PageBody from '../components/PageBody';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const pageURL = `${process.env.BASE_URL}/404`;

const ErrorPage = (props) => {

  const { classes, errorCode } = props;
  const title = '404 | Project Proost';
  const description = 'This is the description for the 404 page';

  var response;
  switch (errorCode) {
    case 200: // Also display a 404 if someone requests /_error explicitly
    case 404:
      response = (
        <Layout
          title = {title}
          description = {description}
          pageURL = {pageURL}
        >
          <PageBody>
            404
          </PageBody>
        </Layout>
      )
      break
    case 500:
      response = (
        <Layout
          title = {title}
          description = {description}
          pageURL = {pageURL}
        >
          <PageBody>
            500
          </PageBody>
        </Layout>
      )
      break
    case 404:
      response = (
        <Layout
          title = {title}
          description = {description}
          pageURL = {pageURL}
        >
          <PageBody>
            default
          </PageBody>
        </Layout>
      )
  }

  return response;
};

ErrorPage.getInitialProps = ({res, xhr}) => {
  const errorCode = res ? res.statusCode : (xhr ? xhr.status : null);
  return {errorCode};
}

ErrorPage.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

// Uncomment the following snippet to pass custom props to the component
// 404.getInitialProps = async ({
//   store, isServer, res, req,
// }) => ({ custom: 'Amit' });

export default withStyles(styles)(ErrorPage);
