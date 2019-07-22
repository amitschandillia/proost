import React, { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import withStyles from '@material-ui/core/styles/withStyles';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import LinkTo from '../components/LinkTo';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/serviceWorker.js'); }
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state; // eslint-disable-line no-unused-vars
    const title = 'Home | Project Proost';
    const description = 'This is the description for the homepage';
    return (
      <Fragment>
        <Head>
          <title>{ title }</title>
          <meta name="description" content={description} key="description" />
        </Head>
        <NavBar />
        <Box my={4} className={classes.root}>
          <Typography variant="h4" component="h1" gutterBottom>
              Material-UI
          </Typography>
          <Typography gutterBottom>
            <LinkTo href="/about" color="secondary">
                Go to the about page
            </LinkTo>
          </Typography>
          <Typography gutterBottom>
            <LinkTo href="/blog">
              View posts page
            </LinkTo>
          </Typography>
          <LinkTo></LinkTo>
          <Button variant="contained" color="primary">
              Super Secret Password
          </Button>
          <Button variant="contained" color="secondary">
              Super Secret Password
          </Button>
          <p className={classes.paragraph}>All men must die</p>
          <p className="xt test">test</p>
        </Box>
      </Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Index);