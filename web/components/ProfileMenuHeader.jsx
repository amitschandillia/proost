import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import LinkTo from './LinkTo';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingBottom: '.5rem',
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
});

const ProfileMenuHeader = (props) => {
  const {
    classes,
    userInfo,
  } = props;

  const fullName = `${userInfo.firstName} ${userInfo.lastName }`.trim();
  const email = Boolean(userInfo.emails) ? userInfo.emails[0] : null;

  return (
    <Fragment>
      <Container className={classes.headerContainer}>
      <Grid container alignItems="center">
        <Grid item xs={11}>
          <Typography variant='subtitle2'>{fullName}</Typography>
          <Typography gutterBottom variant='caption'>{email}</Typography>
        </Grid>
        <Grid item xs={1}>
          <LinkTo href="/">
            <NavigateNextIcon />
          </LinkTo>
        </Grid>
      </Grid>
      </Container>
      <Divider variant='fullWidth' />
    </Fragment>
  );
};

ProfileMenuHeader.propTypes = {
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
  open: state.openProfileMenuHeader,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  // closeProfileMenuHeader: () => {
  //   dispatch({ type: 'OPENPROFILEMENU', payload: false });
  // },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(ProfileMenuHeader));
