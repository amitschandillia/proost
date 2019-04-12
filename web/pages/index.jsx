/* eslint-disable no-unused-vars */

import React, { PureComponent, Fragment } from 'react';
import Head from 'next/head';
import compose from 'recompose/compose';
import Layout from '../components/Layout';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200,
  },
  p: {
    textTransform: 'uppercase',
    color: 'red',
  },
};

class Index extends PureComponent {
  render() {
    const { classes } = this.props;
    const title = 'Project Proost';
    const description = 'This is the description for the homepage';
    return (
      <Fragment>
        <Head>
          <title>{ title }</title>
          <meta name="description" content={description} key="description" />
        </Head>
        <Layout>
          <p className={classes.p}>amit</p>
          <Button variant="contained" color="secondary">
            Secondary
          </Button>
        </Layout>
      </Fragment>
    );
  }
}

export default compose(
  withStyles(styles),
)(Index);
