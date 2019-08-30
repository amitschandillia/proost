import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import LanguageIcon from '@material-ui/icons/Language';
import NotificationsIcon from '@material-ui/icons/Notifications';
import EmailIcon from '@material-ui/icons/Email';
import ProfileMenuFooter from './ProfileMenuFooter';
import ProfileMenuHeader from './ProfileMenuHeader';
import MenuitemSignOut from './MenuitemSignOut';
import Badge from '@material-ui/core/Badge';

const styles = (theme) => ({
  root: {
    // marginTop: theme.typography.htmlFontSize * 0.75,
    marginTop: theme.spacing(1.5),
  },
});

const ProfileDropDown = (props) => {
  const {
    classes,
    pageURL,
    profileMenu,
    profileMenuAnchorEl,
    closeProfileDropDown,
  } = props;

  return (
    <Menu
      id="customized-menu"
      className={classes.root}
      anchorEl={profileMenuAnchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={profileMenu}
      onClose={closeProfileDropDown}
    >
      <ProfileMenuHeader />
      <MenuItem>
        <ListItemIcon>
          <Badge badgeContent={176} color="error">
            <EmailIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Messages" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <Badge badgeContent={176} color="error">
            <NotificationsIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText primary="Notifications" />
      </MenuItem>
      <Divider variant="fullWidth" />
      <MenuItem>
        <ListItemIcon><SettingsIcon /></ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon><LanguageIcon /></ListItemIcon>
        <ListItemText primary="Languages" />
      </MenuItem>
      <MenuItem>
        <ListItemIcon><HelpIcon /></ListItemIcon>
        <ListItemText primary="Help" />
      </MenuItem>
      <MenuitemSignOut pageURL={pageURL} />
      <Divider variant="fullWidth" />
      <ProfileMenuFooter />
    </Menu>
  );
};

ProfileDropDown.propTypes = {
  pageURL: PropTypes.string.isRequired,
  profileMenu: PropTypes.bool.isRequired,
  profileMenuAnchorEl: PropTypes.element.isRequired,
  closeProfileDropDown: PropTypes.func.isRequired,
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
  open: state.openProfileDropDown,
  showSignInView: state.showSignInView,
  showSignUpView: state.showSignUpView,
  profileMenu: state.profileMenu,
  profileMenuAnchorEl: state.profileMenuAnchorEl,
});

const mapDispatchToProps = (dispatch) => ({
  closeProfileDropDown: () => {
    dispatch({ type: 'OPENPROFILEMENU', payload: false });
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProfileDropDown));
