import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import LinkTo from './LinkTo';

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
});

const ProfileMenuFooter = () => (
  <>
    <Container>
      <LinkTo href="/">
        <Typography component="span" variant="caption">About</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">Careers</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">Terms</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <br />
      <LinkTo href="/">
        <Typography component="span" variant="caption">Privacy</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">Acceptable Use</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">Businesses</Typography>
      </LinkTo>
    </Container>
  </>
);

ProfileMenuFooter.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

export default connect(
  null,
  null,
)(withStyles(styles)(ProfileMenuFooter));
