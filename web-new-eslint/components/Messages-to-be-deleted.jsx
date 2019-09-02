import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import Tooltip from '@material-ui/core/Tooltip';
import EmailIcon from '@material-ui/icons/Email';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const styles = (theme) => ({
  messagesStyle: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
});

const Messages = (props) => {
  const {
    classes, userInfo,
  } = props;
  const loggedIn = Object.entries(userInfo).length === 0;

  return (
    <Tooltip title="Messages">
      <IconButton aria-label="show 17 new messages" color="inherit">
        <Badge badgeContent={176} color="error">
          <EmailIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

Messages.propTypes = {
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
)(withStyles(styles)(Messages));
