import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import LinkTo from './LinkTo';
import SignInDialog from './SignInDialog';
import SubmitEmailDialog from './SubmitEmailDialog';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paragraph: {
    fontFamily: 'Source Sans Pro',
  },
});

const NavBar = (props) => {
  const {
    classes, pageURL, sessID, handleClickOpen,
  } = props;

  const logout = `/auth/logout?callback=${pageURL}`;

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <LinkTo href="/">SCHANDILLIA</LinkTo>
          </Typography>
          <span>{sessID}</span>
          <Button color="inherit" href={logout}>Logout</Button>
          <Button color="inherit" onClick={handleClickOpen}>Sign in</Button>
          <SignInDialog pageURL={pageURL} />
        </Toolbar>
      </AppBar>
      <SubmitEmailDialog />
    </Fragment>
  );
};

NavBar.propTypes = {
  sessID: PropTypes.string.isRequired,
  pageURL: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paragraph: PropTypes.string,
    menuButton: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  handleClickOpen: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleClickOpen: () => {
    dispatch({ type: 'SHOWSIGNUPVIEW', payload: false });
    dispatch({ type: 'SHOWSUBMITEMAILVIEW', payload: false });
    dispatch({ type: 'SHOWSIGNINVIEW', payload: true });
    dispatch({ type: 'OPENSIGNINDIALOG', payload: true });
  },
});

export default connect(
  null,
  mapDispatchToProps,
)(withStyles(styles)(NavBar));
