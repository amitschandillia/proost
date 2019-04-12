'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getContext;

var _map = require('babel-runtime/core-js/map');

var _map2 = _interopRequireDefault(_map);

var _jss = require('jss');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

var _styles = require('material-ui/styles');

var _createGenerateClassName = require('material-ui/styles/createGenerateClassName');

var _createGenerateClassName2 = _interopRequireDefault(_createGenerateClassName);

var _blue = require('material-ui/colors/blue');

var _blue2 = _interopRequireDefault(_blue);

var _yellow = require('material-ui/colors/yellow');

var _yellow2 = _interopRequireDefault(_yellow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region Mui theme configuration:


// region imports
var theme = (0, _styles.createMuiTheme)({
  palette: {
    primary: _blue2.default,
    secondary: _yellow2.default
  }
});
// #endregion

// #region Configure JSS
var jss = (0, _jss.create)((0, _jssPresetDefault2.default)());
jss.options.createGenerateClassName = _createGenerateClassName2.default;

function createContext() {
  return {
    jss: jss,
    theme: theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new _map2.default(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new _jss.SheetsRegistry()
  };
}
// #endregion

// #region jss store
function getContext() {
  // Make sure to create a new store for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return createContext();
  }

  // Reuse context on the client-side
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createContext();
  }

  return global.__INIT_MATERIAL_UI__;
}
// #endregion