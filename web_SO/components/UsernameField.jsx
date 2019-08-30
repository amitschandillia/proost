import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import UsernameIcon from './svg-icons/UsernameIcon';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '-0.1rem',
  },
});

const UsernameField = (props) => {
  const {
    classes,
    name = 'uname',
    error,
    fullWidth = true,
    disabled = false,
    value,
    helperText = '',
    required = true,
  } = props;

  return (
    <TextField
      {...{
        id: 'usernameField',
        placeholder: 'johndoe123',
        error,
        fullWidth,
        disabled,
        required,
        variant: 'outlined',
        className: classes.margin,
        label: 'Username',
        name,
        helperText,
        ...(value && { value }),
      }}
      autoComplete="username"
      InputProps={{
        startAdornment: <InputAdornment position="start"><UsernameIcon /></InputAdornment>,
      }}
    />
  );
};

UsernameField.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    margin: PropTypes.string,
  }).isRequired,
};

export default connect((state) => state)(withStyles(styles)(UsernameField));
