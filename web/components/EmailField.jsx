import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import EmailIcon from './svg-icons/EmailIcon';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '-0.1rem',
  },
});

const EmailField = (props) => {
  const { classes, name, error } = props;

  return (
    <TextField
      id="emailField"
      error={error}
      fullWidth
      required
      variant="outlined"
      className={classes.margin}
      label="Email"
      name={name}
      helperText="Please enter a valid email address"
      InputProps={{
        startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
      }}
    />
  );
};

EmailField.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    margin: PropTypes.string,
  }).isRequired,
};


export default connect(state => state)(withStyles(styles)(EmailField));
