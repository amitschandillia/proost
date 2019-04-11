'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styles = require('material-ui/styles');

var _wrapDisplayName = require('recompose/wrapDisplayName');

var _wrapDisplayName2 = _interopRequireDefault(_wrapDisplayName);

var _getContext = require('../styles/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _registerServiceWorker = require('../services/registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

var _registerBeforeinstallprompt = require('../services/registerBeforeinstallprompt');

var _registerBeforeinstallprompt2 = _interopRequireDefault(_registerBeforeinstallprompt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region Apply some style reset


// #region imports
var styles = function styles(theme) {
  return {
    '@global': {
      html: {
        background: theme.palette.background.default,
        WebkitFontSmoothing: 'antialiased', // Antialiasing.
        MozOsxFontSmoothing: 'grayscale' // Antialiasing.
      },
      body: {
        margin: 0
      }
    }
  };
};
// #endregion

// #region AppWrapper component
var AppWrapper = function AppWrapper(props) {
  return props.children;
};

AppWrapper = (0, _styles.withStyles)(styles)(AppWrapper);
// #endregion

// #region flow types

// #endregion

// #region withRoot HOC
function withRoot(BaseComponent) {
  var WithRoot = function (_Component) {
    (0, _inherits3.default)(WithRoot, _Component);

    function WithRoot() {
      (0, _classCallCheck3.default)(this, WithRoot);

      return (0, _possibleConstructorReturn3.default)(this, (WithRoot.__proto__ || (0, _getPrototypeOf2.default)(WithRoot)).apply(this, arguments));
    }

    (0, _createClass3.default)(WithRoot, [{
      key: 'componentWillMount',

      // #region lifecycle methods
      value: function componentWillMount() {
        this.styleContext = (0, _getContext2.default)();
      }
    }, {
      key: 'componentDidMount',
      value: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var jssStyles;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return (0, _registerServiceWorker2.default)();

                case 3:
                  _context.next = 5;
                  return (0, _registerBeforeinstallprompt2.default)();

                case 5:
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.log('service worker error: ', _context.t0);

                case 10:

                  // Remove the server-side injected CSS.
                  jssStyles = document.querySelector('#jss-server-side');

                  if (jssStyles && jssStyles.parentNode) {
                    jssStyles.parentNode.removeChild(jssStyles);
                  }

                case 12:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this, [[0, 7]]);
        }));

        function componentDidMount() {
          return _ref.apply(this, arguments);
        }

        return componentDidMount;
      }()
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(_styles.MuiThemeProvider, {
          theme: this.styleContext.theme,
          sheetsManager: this.styleContext.sheetsManager
        }, _react2.default.createElement(AppWrapper, null, _react2.default.createElement(BaseComponent, this.props)));
      }
      // #endregion

    }], [{
      key: 'getInitialProps',
      value: function getInitialProps(ctx) {
        if (BaseComponent.getInitialProps) {
          return BaseComponent.getInitialProps(ctx);
        }
        return {};
      }
    }]);

    return WithRoot;
  }(_react.Component);
  /* eslint-disable no-process-env */

  if (process.env.NODE_ENV !== 'production') {
    WithRoot.displayName = (0, _wrapDisplayName2.default)(BaseComponent, 'withRoot');
  }
  /* eslint-enable no-process-env */
  return WithRoot;
}
// #endregion

exports.default = withRoot;