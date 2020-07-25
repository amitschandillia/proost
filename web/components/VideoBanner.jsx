/* eslint no-dupe-keys: 0 */

import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const poster = '/_f/images/banner_vid_img.jpg';
const video = '/_f/media/banner_video.mp4';

const styles = (theme) => ({
  root: {
    color: theme.palette.common.white,
    overflow: 'hidden',
  },
  video: {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    display: 'block',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundImage: 'linear-gradient(90deg,#866a4a,rgba(210,180,145,0))',
  },
  children: {
    position: 'absolute',
    top: '50%',
    left: '10vw',
    width: '50vw',
    transform: 'translateY(-70%)',
  },
});

const VideoBanner = (props) => {
  const {
    classes, children,
  } = props;

  return (
    <>
      <div className={classes.root}>
        <video
          loop
          playsinline
          autoPlay="autoplay"
          muted
          poster={poster}
          className={classes.video}
        >
          <source type="video/mp4" src={video} />
        </video>
        <div className={classes.overlay} />
        <div className={classes.children}>{children}</div>
      </div>
    </>
  );
};

VideoBanner.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  children: PropTypes.node.isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(VideoBanner));
