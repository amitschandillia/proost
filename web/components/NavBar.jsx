import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';

import BlogButton from './BlogButton';
import CartButton from './CartButton';
import LinkTo from './LinkTo';
import ProfileMenu from './ProfileMenu';
import SearchField from './SearchField';
import SignInDialog from './SignInDialog';
import StoreButton from './StoreButton';
import SubmitEmailDialog from './SubmitEmailDialog';
import ToolsButton from './ToolsButton';
import shouldBypassLogin from '../utils/should-bypass-login';

import Link from 'next/link';

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
  growMore: {
    flexGrow: 10,
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
  desktopHeaderLogo: {
    // marginLeft: -1 * theme.spacing(2),
  },
  sectionDesktop: {
    alignItems: 'center',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexGrow: 1,
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
    classes, pageURL, userInfo, openSignInDialog, transparent = false,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  const transparentStyle = (transparent ? classes.transparentAppBar : null);

  const scrollFunction = () => {
    const nav = document.getElementById('nav');
    const overlay = document.getElementById('nav-overlay');
    const desktopHeaderLogo = document.getElementById('desktop-header-logo');
    const travel = typeof window.scrollY === 'undefined' ? window.pageYOffset : window.scrollY;
    const navHeight = 7 - ((travel / 16) / 6);
    desktopHeaderLogo.style.width = 'auto';
    if (navHeight <= 4) {
      nav.style.lineHeight = `${4}rem`;
      overlay.style.opacity = 1;
      desktopHeaderLogo.style.height = `${4}rem`;
    } else if (navHeight >= 7) {
      nav.style.lineHeight = `${7}rem`;
      overlay.style.opacity = 0;
      desktopHeaderLogo.style.height = `${7}rem`;
    } else {
      nav.style.lineHeight = `${navHeight}rem`;
      overlay.style.opacity = (7 - navHeight) / 3;
      desktopHeaderLogo.style.height = `${navHeight}rem`;
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
  }, [transparent]);

  const handleClickOpen = async () => {
    // If login should be bypassed, proceed to login without auth
    // otherwise open sign in dialog
    let isLoggedIn = await shouldBypassLogin(pageURL);
    isLoggedIn = typeof isLoggedIn === 'undefined' ? true : isLoggedIn;
    if (!isLoggedIn) {
      // Failed to auto-login
      openSignInDialog();
    }
  };


  const desktopMenu = (
    <div className={classes.sectionDesktop}>
      <Link href="/">
        <a  style={{lineHeight: 0}}><img id="desktop-header-logo" className={classes.desktopHeaderLogo} src="_f/images/desktop-header-logo.png" width="64" height="64" /></a>
      </Link>
      <div className={classes.growMore} />
      <SearchField />
      <div className={classes.grow} />
      <ToolsButton />
      <div className={classes.grow} />
      <BlogButton />
      <div className={classes.grow} />
      <StoreButton />
      <div className={classes.grow} />
      <CartButton />
      <div className={classes.grow} />
      {
      loggedIn
      && (
      <Button
        className={classes.loginBtn}
        variant="outlined"
        color="inherit"
        onClick={handleClickOpen}
      >
        Sign in
      </Button>
      )
      }
      {!loggedIn && <ProfileMenu pageURL={pageURL} />}
    </div>
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
          {desktopMenu}
        </Toolbar>
      </AppBar>
      <SignInDialog pageURL={pageURL} />
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
    grow: PropTypes.string,
    sectionDesktopSearch: PropTypes.string,
    sectionDesktop: PropTypes.string,
    sectionMobile: PropTypes.string,
    loginBtn: PropTypes.string,
    menuButton: PropTypes.string,
    transparentAppBar: PropTypes.string,
    overlay: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  openSignInDialog: PropTypes.func.isRequired,
  transparent: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  openSignInDialog: () => {
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
