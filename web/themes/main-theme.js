import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
// Color reference (MUI): https://material-ui.com/customization/color/#color-palette
// Color reference (Google): https://material.io/tools/color/
// Color code usage:
// Numeric: <color>[code]; e.g., brown[500]
// Alphanumeric: <color>.<code>; e.g., red.A400

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
    },
    secondary: {
      main: blueGrey[900],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: blueGrey[50],
    },
    prefooter: {
      default: blueGrey[100],
    },
  },
});

export default mainTheme;
