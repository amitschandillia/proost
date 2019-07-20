import React, { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import MuiLink from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';
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

class About extends PureComponent {
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
    const title = 'About | Project Proost';
    const description = 'This is the description for the about page';
    return (
      <Fragment>
        <Head>
          <title>{ title }</title>
          <meta name="description" content={description} key="description" />
        </Head>
        <Container>
          <Box my={4} className={classes.root}>
            <Typography variant="h4" gutterBottom>
              Material-UI
            </Typography>
            <Typography gutterBottom>
              <Link href="/">
                <a>Go home</a>
              </Link>
            </Typography>
            <Button variant="contained" color="primary">
                    Super Secret Password
            </Button>
            <Button variant="contained" color="secondary">
                    Super Secret Password
            </Button>
          </Box>
        </Container>
      </Fragment>
    );
  }
}

About.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(About);
