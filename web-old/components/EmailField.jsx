import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import EmailIcon from './svg-icons/EmailIcon';
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

const EmailField = (props) => {
  const {
    classes,
    name,
    error,
    placeholder = 'john@doe.com',
    fullWidth = true,
    type = 'email',
    disabled = false,
    value,
    helperText = 'Please enter a valid email address',
    label = 'Email',
    required = true,
  } = props;

  const FieldIcon = () => {
    let element;
    if (type === 'email') {
      element = <EmailIcon />;
    } else {
      element = <UsernameIcon />;
    }
    return element;
  };

  return (
    <TextField
      {...{
        id: 'emailField',
        placeholder,
        error,
        type,
        fullWidth,
        disabled,
        required,
        variant: 'outlined',
        className: classes.margin,
        label,
        name,
        helperText,
        ...(value && { value }),
      }}
      autoComplete="username email"
      InputProps={{
        startAdornment:
  <InputAdornment position="start">
    <FieldIcon />
  </InputAdornment>,
      }}
    />
  );
};

EmailField.propTypes = {
  error: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  helperText: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool.isRequired,
  classes: PropTypes.shape({
    root: PropTypes.string,
    margin: PropTypes.string,
  }).isRequired,
};

export default connect((state) => state)(withStyles(styles)(EmailField));
