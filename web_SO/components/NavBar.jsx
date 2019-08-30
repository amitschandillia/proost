import React, { useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinkTo from './LinkTo';
import SignInDialog from './SignInDialog';
import SubmitEmailDialog from './SubmitEmailDialog';
import ProfileMenu from './ProfileMenu';
import SearchField from './SearchField';
import Cart from './Cart';
import Store from './Store';
import BlogButton from './BlogButton';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  grow: {
    flexGrow: 1,
  },
  loginBtn: {
    marginLeft: theme.spacing(2),
  },
  transparentAppBar: {
    lineHeight: '7rem',
    boxShadow: 'none',
    background: 'transparent',
  },
  overlay: {
    content: '\'\'',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    background: theme.palette.primary.main,
    opacity: 0,
    zIndex: -1,
  },
  sectionDesktop: {
    alignItems: 'center',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionDesktopSearch: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

const NavBar = (props) => {
  const {
    classes, pageURL, userInfo, handleClickOpen, transparent = false,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  const transparentStyle = (transparent ? classes.transparentAppBar : null);

  const scrollFunction = () => {
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('nav-overlay');
    const travel = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;
    const travelRem = travel / 16;
    const navHeight = 7 - (travelRem / 6);
    if (navHeight <= 4) {
      nav.style.lineHeight = `${4}rem`;
      overlay.style.opacity = 1;
    } else if (navHeight >= 7) {
      nav.style.lineHeight = `${7}rem`;
      overlay.style.opacity = 0;
    } else {
      nav.style.lineHeight = `${navHeight}rem`;
      overlay.style.opacity = (7 - navHeight) / 3;
    }
  };

  useLayoutEffect(() => {
    if (transparent) {
      window.addEventListener('scroll', scrollFunction);
      scrollFunction();
    }
    // returned function will be called on component unmount
    return () => {
      window.removeEventListener('scroll', scrollFunction);
    };
  }, []);

  const brand = (
    <Typography variant="h6" className={classes.title}>
      <LinkTo href="/">SCHANDILLIA</LinkTo>
    </Typography>
  );
  const desktopMenu = (
    <>
      <SearchField className={classes.sectionDesktopSearch} />
      <div className={classes.grow} />
      <div className={classes.sectionDesktop}>
        <BlogButton />
        <Store />
        <Cart />
        {
          loggedIn &&
          <Button
            className={classes.loginBtn}
            variant="outlined"
            color="inherit"
            onClick={handleClickOpen}
          >
            Sign in
          </Button>
        }
        {!loggedIn && <ProfileMenu pageURL={pageURL} />}
        <SignInDialog pageURL={pageURL} />
      </div>
    </>
  );
  const mobileMenu = (
    <div className={classes.sectionMobile}>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
      >
        <MenuIcon />
      </IconButton>
    </div>
  );

  return (
    <>
      <AppBar id="nav" className={transparentStyle} position="fixed">
        {transparent && <span id="nav-overlay" className={classes.overlay} />}
        <Toolbar>
          {mobileMenu}
          {brand}
          <div className={classes.grow} />
          {desktopMenu}
        </Toolbar>
      </AppBar>
      <SubmitEmailDialog />
    </>
  );
};

NavBar.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    transparentAppBar: PropTypes.string,
    overlay: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
  transparent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickOpen: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSUBMITEMAILVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
    dispatch({ type: 'OPENSIGNINDIALOG', payload: true });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGCREDENTIALSERROR', payload: 'none' });
    dispatch({ type: 'FLAGEPASSWORDERROR', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(NavBar));
