import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import NameIcon from './svg-icons/NameIcon';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '-0.1rem',
  },
});

const FirstNameField = (props) => {
  const {
    classes,
    name = 'fname',
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
        id: 'firstNameField',
        placeholder: 'John',
        error,
        fullWidth,
        disabled,
        required,
        variant: 'outlined',
        className: classes.margin,
        label: 'First Name',
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

FirstNameField.propTypes = {
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

export default connect(state => state)(withStyles(styles)(FirstNameField));
