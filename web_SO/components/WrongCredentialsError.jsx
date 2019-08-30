import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

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

const WrongCredentialsError = (props) => {
  const { credentialsErrorDisplay } = props;

  return (
    <Box display={credentialsErrorDisplay}>
      <Typography color="error" variant="body1" gutterBottom>
        {'Wrong credentials. Try again...'}
      </Typography>
    </Box>
  );
};

WrongCredentialsError.propTypes = {
  credentialsErrorDisplay: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    dialogTitle: PropTypes.string,
    textField: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  credentialsErrorDisplay: state.credentialsErrorDisplay,
});

export default connect(
  mapStateToProps,
  null,
)(withStyles(styles)(WrongCredentialsError));
