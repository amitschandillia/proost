import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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

const ProfileMenuFooter = (props) => {
  const {
    classes,
    language,
  } = props;
  return (
    <Container>
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.about}</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.careers}</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.terms}</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <br />
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.privacy}</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.acceptableUse}</Typography>
      </LinkTo>
      <Typography component="span" variant="caption"> &#8226; </Typography>
      <LinkTo href="/">
        <Typography component="span" variant="caption">{language.lexicon.businesses}</Typography>
      </LinkTo>
    </Container>
  );
};

ProfileMenuFooter.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(ProfileMenuFooter));
