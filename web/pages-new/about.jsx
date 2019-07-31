import React, { Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import NavBar from '../components/NavBar';
import LinkTo from '../components/LinkTo';

const styles = theme => ({
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

  return(
    <Fragment>
      <Head>
        <title>{ title }</title>
        <meta name="description" content={description} key="description" />
      </Head>
      <NavBar pageURL={pageURL} />
      <Box my={4} className={classes.root}>
        <Typography variant="h4" gutterBottom>
          Material-UI
        </Typography>
        <Typography gutterBottom>
          <LinkTo href="/">
            <a>Go home</a>
          </LinkTo>
        </Typography>
        <Button variant="contained" color="primary">
                Super Secret Password
        </Button>
        <Button variant="contained" color="secondary">
                Super Secret Password
        </Button>
      </Box>
    </Fragment>
  );
};

export default withStyles(styles)(About);
