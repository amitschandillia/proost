import React from 'react';
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    classes, pageURL, sessID,
  } = props;

  const logout = `/auth/logout?callback=${pageURL}`;

  return (
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
        <SignInDialog
          pageURL={pageURL}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
        />
      </Toolbar>
    </AppBar>
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
};

// Uncomment the following snippet to pass custom props to the component
// NavBar.getInitialProps = async ({
//   store, isServer, res, req,
// }) => ({ custom: 'Amit' });

export default connect(state => state)(withStyles(styles)(NavBar));
