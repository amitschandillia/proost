import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  notificationsStyle: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
});

const Notifications = (props) => {
  const {
    userInfo,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Tooltip title="Notifications">
      <IconButton aria-label="show 17 new notifications" color="inherit">
        <Badge badgeContent={176} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

Notifications.propTypes = {
  userInfo: PropTypes.shape({
    firstName: PropTypes.string,
    nameToAddress: PropTypes.string,
  }).isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    transparentAppBar: PropTypes.string,
    overlay: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  userInfo: state.userInfo,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(Notifications));
