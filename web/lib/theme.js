import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import brown from '@material-ui/core/colors/brown';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary:{
      main: brown[300],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
