import React, { useState } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { connect } from 'react-redux';
import PasswordIcon from './svg-icons/PasswordIcon';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
    marginLeft: '-0.1rem',
  },
});

const PasswordField = (props) => {
  const { classes, name = 'password', error, fullWidth = true, label = 'Password', id = 'passwordField', helperText = 'Please enter your secret password', placeholder = 'Secret!' } = props;
  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = prop => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <TextField
      id={id}
      fullWidth={fullWidth}
      required
      placeholder={placeholder}
      variant="outlined"
      className={classes.margin}
      type={values.showPassword ? 'text' : 'password'}
      name={name}
      label={label}
      value={values.password}
      onChange={handleChange('password')}
      error={error}
      helperText={helperText}
      autoComplete="new-password"
      InputProps={{
        startAdornment: <InputAdornment position="start"><PasswordIcon /></InputAdornment>,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label="Toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordField.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string,
    margin: PropTypes.string,
  }).isRequired,
};

export default connect(state => state)(withStyles(styles)(PasswordField));
