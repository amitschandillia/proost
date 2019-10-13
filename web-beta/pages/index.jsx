/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';

// import Banner from '../components/Banner';
import VideoBanner from '../components/VideoBanner';
import LinkTo from '../components/LinkTo';

import Layout from '../components/Layout';
import PageBody from '../components/PageBody';
import TopThree from '../components/TopThree';
import Slogan from '../components/Slogan';
import WhitespaceGrid from '../components/WhitespaceGrid';
import WidescreenBanner from '../components/WidescreenBanner';
import Testimonials from '../components/Testimonials';

const styles = (theme) => ({
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

const pageURL = `${process.env.BASE_URL}`;

const Index = (props) => {
  const {
    classes, userInfo, sessID, custom,
  } = props;
  const title = 'Home | Project Proost';
  const description = 'This is the description for the homepage';
  return (
    <Layout
      title = {title}
      description = {description}
      pageURL = {pageURL}
      transparent = {true}
    >
      <VideoBanner>
        <Typography variant="h5">This is a text</Typography>
      </VideoBanner>
      <PageBody nomargin>
        {/*Whitespace: Slogan*/}
        <Slogan />
        {/*B/W boxes: Top 3 blog posts*/}
        <TopThree />
        {/*Whitespace grid*/}
        <WhitespaceGrid />
        {/*Widescreen banner: Advertisement*/}
        <WidescreenBanner>
          <div style={{textAlign: 'center'}}>
            <Typography variant="h2">This is just random</Typography>
            <Typography variant="h5">And this is even more random...just to fill the banner out!</Typography>
          </div>
        </WidescreenBanner>
        {/*Whitespace: Testimonials*/}
        <Testimonials />
      </PageBody>
    </Layout>
  );
};

Index.propTypes = {
  sessID: PropTypes.string.isRequired,
  custom: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
};

// export default connect((state) => state)(withStyles(styles)(Index));

const mapStateToProps = (state) => ({
  // ip: state.ip,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Index));
