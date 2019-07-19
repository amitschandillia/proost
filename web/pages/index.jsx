import React, { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import MuiLink from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Link from 'next/link';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing(20),
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
        <Container>
          <Box my={4} className={classes.root}>
            <Typography variant="h4" component="h1" gutterBottom>
              Material-UI
            </Typography>
            {/* <Typography variant="h4" component="h1" gutterBottom>
              Next.js v4-beta example
            </Typography> */}
            <Typography gutterBottom>
              <Link href="/about" color="secondary">
                Go to the about page
              </Link>
            </Typography>
            <Typography gutterBottom>
              <Link href="/blog">
                <a>View posts page</a>
              </Link>
            </Typography>
            <Button variant="contained" color="primary">
              Super Secret Password
            </Button>
            <Button variant="contained" color="secondary">
              Super Secret Password
            </Button>
            <p className={classes.paragraph}>All men must die</p>
            <p className="xt test">test</p>
          </Box>
        </Container>
      </Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Index);
