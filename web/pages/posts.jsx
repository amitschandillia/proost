import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import Link from 'next/link';
import withRoot from '../lib/withRoot';
import PostsList from '../components/PostsList';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  paragraph: {
    fontFamily: 'Raleway',
  },
});

class Posts extends PureComponent {
  constructor(props) {
    super(props);
    // query state will be passed to Posts for the filter query
    this.state = {
      query: '',
    };
  }

  componentDidMount() {
    if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/serviceWorker.js'); }
  }

  onChange(e) {
    // set the state = to the input typed in the search Input Component
    // this.state.query gets passed into Posts to filter the results
    this.setState({ query: e.target.value.toLowerCase() });
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state; // eslint-disable-line no-unused-vars
    const title = 'Posts | Project Proost';
    const description = 'This is posts page';
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
            <Link href="/posts">
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
        <PostsList search={this.state.query} />
      </Fragment>
    );
  }
}

Posts.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
};

// Posts.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withRoot(withStyles(styles)(Posts));
