// web/pages/blog.jsx

import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Link from 'next/link';
import withRoot from '../lib/withRoot';
import PostsList from '../components/blog/PostsList';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paragraph: {
    fontFamily: 'Raleway',
  },
});

class Blog extends PureComponent {
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
    const title = 'Blog | Project Proost';
    const description = 'This is the blog page';
    return (
      <Fragment>
        <Head>
          <title>{ title }</title>
          <meta name="description" content={description} key="description" />
        </Head>
        <div className={classes.root}>
          <Typography variant="display1" gutterBottom>
            Material-UI
          </Typography>
          <Typography gutterBottom>
            <Link href="/about">
              <a>Go to the about page</a>
            </Link>
          </Typography>
          <Typography gutterBottom>
            <Link href="/blog">
              <a>View posts</a>
            </Link>
          </Typography>
          <Button variant="raised" color="primary">
            Super Secret Password
          </Button>
          <Button variant="raised" color="secondary">
            Super Secret Password
          </Button>
        </div>
        <PostsList />
      </Fragment>
    );
  }
}

Blog.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

// Posts.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withRoot(withStyles(styles)(Blog));
