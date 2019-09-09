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
        {/*Tools*/}
        {/*Color boxes: Top 3 products*/}
        {/*Testimonials*/}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut sem nulla pharetra diam sit amet nisl suscipit adipiscing. Felis imperdiet proin fermentum leo vel. Dapibus ultrices in iaculis nunc. Praesent tristique magna sit amet purus gravida quis. Lectus sit amet est placerat. Rutrum tellus pellentesque eu tincidunt. Sed nisi lacus sed viverra. Dui faucibus in ornare quam viverra orci. Euismod nisi porta lorem mollis aliquam ut. Morbi blandit cursus risus at ultrices mi. Sollicitudin aliquam ultrices sagittis orci a scelerisque. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Lorem mollis aliquam ut porttitor leo a diam. Odio aenean sed adipiscing diam donec adipiscing tristique risus nec. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Facilisis leo vel fringilla est ullamcorper eget. Volutpat lacus laoreet non curabitur gravida arcu. Viverra tellus in hac habitasse platea dictumst. Quis hendrerit dolor magna eget est lorem ipsum. Mi proin sed libero enim sed faucibus turpis in eu. Id neque aliquam vestibulum morbi blandit. Quis blandit turpis cursus in. Ut lectus arcu bibendum at varius vel pharetra vel turpis. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Massa enim nec dui nunc mattis enim ut. Quis commodo odio aenean sed. Nam at lectus urna duis convallis convallis tellus id. Id diam maecenas ultricies mi eget mauris pharetra et ultrices. Integer malesuada nunc vel risus commodo viverra maecenas. Tempor nec feugiat nisl pretium fusce id velit ut tortor. Diam vel quam elementum pulvinar etiam. Porttitor leo a diam sollicitudin tempor. Aliquam vestibulum morbi blandit cursus risus. Amet consectetur adipiscing elit pellentesque habitant morbi tristique. Feugiat vivamus at augue eget arcu dictum. Lobortis scelerisque fermentum dui faucibus in ornare quam. Et malesuada fames ac turpis egestas integer eget aliquet nibh. Mi eget mauris pharetra et ultrices neque ornare. Morbi non arcu risus quis. Blandit libero volutpat sed cras ornare. Cursus euismod quis viverra nibh cras pulvinar mattis nunc sed. Tempor id eu nisl nunc mi. Duis ut diam quam nulla porttitor massa. Massa ultricies mi quis hendrerit dolor magna eget. Nunc aliquet bibendum enim facilisis gravida neque. Non blandit massa enim nec dui. Convallis tellus id interdum velit laoreet id donec. Quis ipsum suspendisse ultrices gravida. Cursus turpis massa tincidunt dui ut. Ut tortor pretium viverra suspendisse. Lacinia at quis risus sed vulputate odio ut enim. Tincidunt vitae semper quis lectus nulla at volutpat. Adipiscing vitae proin sagittis nisl. Habitant morbi tristique senectus et netus et malesuada fames ac. Mattis ullamcorper velit sed ullamcorper. Habitant morbi tristique senectus et netus et malesuada fames. Rhoncus aenean vel elit scelerisque. Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. Turpis massa sed elementum tempus egestas sed sed risus pretium. Donec et odio pellentesque diam volutpat commodo sed egestas egestas. Nulla facilisi morbi tempus iaculis urna. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ullamcorper eget nulla facilisi etiam. Varius quam quisque id diam. Faucibus nisl tincidunt eget nullam non nisi est sit amet. Arcu dui vivamus arcu felis bibendum ut tristique et. Senectus et netus et malesuada fames ac turpis.
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

export default connect((state) => state)(withStyles(styles)(Index));
