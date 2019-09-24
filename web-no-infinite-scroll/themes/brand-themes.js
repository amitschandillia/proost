import indigo from '@material-ui/core/colors/indigo';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { createMuiTheme } from '@material-ui/core/styles';

// Create a theme instance.
// Color reference (MUI): https://material-ui.com/customization/color/#color-palette
// Color reference (Google): https://material.io/tools/color/
// Color code usage:
// Numeric: <color>[code]; e.g., brown[500]
// Alphanumeric: <color>.<code>; e.g., red.A400

const googleTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#db4437',
    },
  },
});
const facebookTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#3b5998',
    },
  },
});
const twitterTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1da1f2',
    },
  },
});
const appleTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
});
const androidTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#a4c639',
    },
  },
});
export {
  googleTheme,
  facebookTheme,
  twitterTheme,
  appleTheme,
  androidTheme,
};
