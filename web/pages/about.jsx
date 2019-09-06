import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';

import LinkTo from '../components/LinkTo';
import Layout from '../components/Layout';

const styles = (theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const pageURL = `${process.env.BASE_URL}/about`;

const About = (props) => {
  const { classes } = props;
  const title = 'About | Project Proost';
  const description = 'This is the description for the about page';

  return (
    <>
      <Layout
        title = {title}
        description = {description}
        pageURL = {pageURL}
      >
        <Box my={4} className={classes.root}>
          <Typography variant="h4" gutterBottom>
            Material-UI
          </Typography>
          <Typography gutterBottom>
            <LinkTo href="/">
              Go home
            </LinkTo>
          </Typography>
          <Button variant="contained" color="primary">
                  Super Secret Password
          </Button>
          <Button variant="contained" color="secondary">
                  Super Secret Password
          </Button>
        </Box>
      </Layout>
    </>
  );
};

About.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

// Uncomment the following snippet to pass custom props to the component
// About.getInitialProps = async ({
//   store, isServer, res, req,
// }) => ({ custom: 'Amit' });

export default withStyles(styles)(About);
