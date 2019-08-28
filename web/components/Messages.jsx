import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  messagesStyle: {
    verticalAlign: 'middle',
    marginRight: theme.typography.htmlFontSize / 2,
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
