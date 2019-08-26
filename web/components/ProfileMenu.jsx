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
  },
  anonymousAvatar: {
    margin: 10,
    backgroundColor: avatarTheme.palette.primary.main,
  },
});

const ProfileMenu = (props) => {
  const {
    classes, pageURL, handleClose, open, showSignInView, showSignUpView, userInfo,
  } = props;

  const imgURL = `https://i.${process.env.THIS_DOMAIN}.com/w/${userInfo.userID}.${userInfo.versionID}.jpg`;
  let fullName = `${userInfo.firstName} ${userInfo.lastName}`;
  if(fullName && typeof fullName !== undefined) { fullName = fullName.trim(); }

  let ProfileCircle;
  if(userInfo.hasPicture) {
    ProfileCircle = <Avatar alt={fullName} src={imgURL} className={classes.avatar} />;
  } else {
    ProfileCircle = <Avatar className={classes.anonymousAvatar}>{userInfo.initials}</Avatar>;
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProfileMenu));
