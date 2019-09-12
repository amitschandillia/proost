/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import ThreePicsItem from './ThreePicsItem';
import LinkTo from './LinkTo';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonIcon from '@material-ui/icons/Person';

import Box from '@material-ui/core/Box';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  sloganText: {
    background: 'linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textAlign: 'center',
  },
});

const Text = 'Expand your world...One word at a time';

const Slogan = (props) => {
  const {
    classes,
    language,
  } = props;

  const isInViewport = (elem, window, document) => {
    const bounding = elem.getBoundingClientRect();
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

  const scrollFunction = () => {
    const Text = document.getElementById('Text');
    if(isInViewport(Text, window, document)) {
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
  }, []);

  return (
    <Box py={20} px={2} className={classes.root}>
      <Typography
        variant="h2"
        className={`${classes.sloganText} hidden`}
        id="Text"
      >
        {language.lexicon.slogan}
      </Typography>
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
