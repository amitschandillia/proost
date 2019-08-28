import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';
import SignInView from './SignInView';
import SignUpView from './SignUpView';
import avatarTheme from '../themes/avatar-theme';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import ProfileDropDown from './ProfileDropDown';

const styles = theme => ({
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
    classes, pageURL, handleClose, open, showSignInView, showSignUpView, userInfo, profileMenu, openProfileMenu
  } = props;

  const imgURL = `https://i.${process.env.THIS_DOMAIN}.com/w/${userInfo.userID}.${userInfo.pictureVersion}.jpg`;
  let fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  if(fullName && typeof fullName !== undefined) { fullName = fullName.trim(); }

  let ProfileCircle;
  if(userInfo.hasPicture) {
    ProfileCircle = (
      <Fragment>
        <Avatar onClick={openProfileMenu} alt={fullName} src={imgURL} className={classes.avatar} />
        <KeyboardArrowDownIcon onClick={openProfileMenu} />
        <ProfileDropDown pageURL={pageURL} />
      </Fragment>
    );
  } else {
    ProfileCircle = (
      <Fragment>
        <Avatar onClick={openProfileMenu} className={classes.anonymousAvatar}>{userInfo.initials}</Avatar>
        <KeyboardArrowDownIcon onClick={openProfileMenu} />
        <ProfileDropDown pageURL={pageURL} />
      </Fragment>
    );
  }
  return ProfileCircle;
};

ProfileMenu.propTypes = {
  pageURL: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  showSignInView: PropTypes.bool.isRequired,
  showSignUpView: PropTypes.bool.isRequired,
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

const mapStateToProps = state => ({
  open: state.openProfileMenu,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  userInfo: state.userInfo,
  profileMenu: state.profileMenu,
});

const mapDispatchToProps = dispatch => ({
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
