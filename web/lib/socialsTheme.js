import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import deepPurple from '@material-ui/core/colors/deepPurple';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';

// Create a theme instance.
// Color reference (MUI): https://material-ui.com/customization/color/#color-palette
// Color reference (Google): https://material.io/tools/color/
// Color code usage:
// Numeric: <color>[code]; e.g., brown[500]
// Alphanumeric: <color>.<code>; e.g., red.A400

const googleTheme = createMuiTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});
const facebookTheme = createMuiTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
  },
});
const twitterTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[600],
    },
  },
});

export {
  googleTheme,
  facebookTheme,
  twitterTheme,
}
