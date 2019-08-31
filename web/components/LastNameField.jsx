import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import NameIcon from './svg-icons/NameIcon';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '-0.1rem',
  },
});

const LastNameField = (props) => {
  const {
    classes,
    name = 'lname',
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
        id: 'lastNameField',
        placeholder: 'Doe',
        error,
        fullWidth,
        disabled,
        required,
        variant: 'outlined',
        className: classes.margin,
        label: 'Last Name',
        name,
        helperText,
        ...(value && { value }),
      }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><NameIcon /></InputAdornment>,
      }}
    />
  );
};

LastNameField.propTypes = {
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

export default connect((state) => state)(withStyles(styles)(LastNameField));
