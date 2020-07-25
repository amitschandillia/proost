import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import amber from '@material-ui/core/colors/amber';
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
    icon: {
      default: grey[600],
    },
    avatar: {
      default: blue[600],
    },
    title: {
      default: amber[200],
    },
    link: {
      default: lightBlue[700],
    },
    blockquoteBorder: {
      default: grey[400],
    },
    blockquoteBackground: {
      default: grey[300],
    },
    email: {
      text: blueGrey[700],
      background: grey[100],
      backgroundBorder: grey[300],
    },
  },
});

export default mainTheme;
