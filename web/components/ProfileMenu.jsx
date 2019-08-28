import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import avatarTheme from '../themes/avatar-theme';

import ProfileDropDown from './ProfileDropDown';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  signInText: {
    marginLeft: theme.spacing(1),
    textAlign: 'center',
  },
  dialogTitle: {
    textAlign: 'center',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    marginBottom: theme.spacing(2),
  },
  socialsIcon: {
    paddingLeft: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  avatar: {
    margin: 10,
    marginRight: 0,
    cursor: 'pointer',
  },
  anonymousAvatar: {
    margin: 10,
    marginRight: 0,
    backgroundColor: avatarTheme.palette.primary.main,
    cursor: 'pointer',
  },
});

const ProfileMenu = (props) => {
  const {
    classes, pageURL, userInfo, profileMenu, openProfileMenu,
  } = props;

  const imgURL = `https://i.${process.env.THIS_DOMAIN}.com/w/${userInfo.userID}.${userInfo.pictureVersion}.jpg`;
  let fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  if (fullName && typeof fullName !== 'undefined') { fullName = fullName.trim(); }

  let ProfileCircle;
  if (userInfo.hasPicture) {
    ProfileCircle = (
      <>
        <Avatar onClick={openProfileMenu} alt={fullName} src={imgURL} className={classes.avatar} />
        {!profileMenu && <KeyboardArrowDownIcon />}
        {profileMenu && <KeyboardArrowUpIcon />}
        <ProfileDropDown pageURL={pageURL} />
      </>
    );
  } else {
    ProfileCircle = (
      <>
        <Avatar onClick={openProfileMenu} className={classes.anonymousAvatar}>
          {userInfo.initials}
        </Avatar>
        {!profileMenu && <KeyboardArrowDownIcon />}
        {profileMenu && <KeyboardArrowUpIcon />}
        <ProfileDropDown pageURL={pageURL} />
      </>
    );
  }
  return ProfileCircle;
};

ProfileMenu.propTypes = {
  pageURL: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  open: state.openProfileMenu,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  userInfo: state.userInfo,
  profileMenu: state.profileMenu,
});

const mapDispatchToProps = (dispatch) => ({
  showSignUp: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: true });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: false });
    dispatch({ type: 'FLAGEMAILERROR', payload: false });
    dispatch({ type: 'FLAGEPASSWORDERROR', payload: false });
  },
  showSignIn: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
  },
  handleClose: () => {
    dispatch({ type: 'OPENSIGNINDIALOG', payload: false });
    dispatch({ type: 'WARNFOREXISTINGEMAIL', payload: 0 });
  },
  openProfileMenu: (e) => {
    dispatch({ type: 'OPENPROFILEMENU', payload: Boolean(e.currentTarget) });
    dispatch({ type: 'CHANGEPROFILEMENUANCHOREL', payload: e.currentTarget });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProfileMenu));
