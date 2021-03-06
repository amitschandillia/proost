/* eslint no-dupe-keys: 0 */

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import GradientText from './GradientText';
import LinkTo from './LinkTo';
import ThreePicsItem from './ThreePicsItem';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sloganText: {
    textAlign: 'center',
  },
});

const Slogan = (props) => {
  const {
    classes,
    language,
  } = props;

  const isInViewport = (elem, window, document) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0
      && bounding.left >= 0
      && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const scrollFunction = () => {
    const Text = document.getElementById('slogan');
    if (isInViewport(Text, window, document)) {
      Text.classList.add('fade-in');
      Text.classList.remove('hidden');
    }
  };

  useLayoutEffect(() => {
    window.addEventListener('scroll', scrollFunction);
    scrollFunction();
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, [scrollFunction]);

  return (
    <Box py={10} px={2} className={classes.root}>
      <GradientText
        variant="h2"
        className={`${classes.sloganText} hidden`}
        id="slogan"
        angle="diagonal"
        gradientName="jShine"
      >
        {language.lexicon.slogan}
      </GradientText>
    </Box>
  );
};

Slogan.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Slogan));
