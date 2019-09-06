/* eslint-disable no-unused-vars */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import LinkTo from '../components/LinkTo';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
});

const Footer = (props) => {
  const {
    classes
  } = props;
  return (
    <>
      <Container>
        <Typography>Footer text goes here!</Typography>
      </Container>
    </>
  );
};

Footer.propTypes = {
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

export default connect((state) => state)(withStyles(styles)(Footer));
