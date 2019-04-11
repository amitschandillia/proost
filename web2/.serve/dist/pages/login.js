'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _redux = require('redux');

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _es6PromiseDebounce = require('es6-promise-debounce');

var _es6PromiseDebounce2 = _interopRequireDefault(_es6PromiseDebounce);

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Snackbar = require('material-ui/Snackbar');

var _Snackbar2 = _interopRequireDefault(_Snackbar);

var _Slide = require('material-ui/transitions/Slide');

var _Slide2 = _interopRequireDefault(_Slide);

var _Grid = require('material-ui/Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('material-ui/styles');

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Form = require('material-ui/Form');

var _MailOutline = require('material-ui-icons/MailOutline');

var _MailOutline2 = _interopRequireDefault(_MailOutline);

var _LockOutline = require('material-ui-icons/LockOutline');

var _LockOutline2 = _interopRequireDefault(_LockOutline);

var _configureStore = require('../redux/store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _userAuth = require('../redux/modules/userAuth');

var userAuthActions = _interopRequireWildcard(_userAuth);

var _withRoot = require('../HOC/withRoot');

var _withRoot2 = _interopRequireDefault(_withRoot);

var _Layout = require('../components/layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

var _auth = require('../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region flow types

// #endregion

// #region styles
var styles = function styles(theme) {
  return {
    content: {
      flexGrow: 1,
      marginTop: '70px',
      paddingTop: '40px'
    },
    formControl: {
      margin: theme.spacing.unit
    },
    inputIcon: {
      marginBottom: 1
    },

    formButtonContainer: {
      marginTop: '10px'
    }
  };
};
// #endregion

/* eslint-disable quotes */

// #region imports
var Login = function (_PureComponent) {
  (0, _inherits3.default)(Login, _PureComponent);

  function Login() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Login);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Login.__proto__ || (0, _getPrototypeOf2.default)(Login)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      email: '',
      password: '',
      browserStorageSupported: true,
      showSnackbar: false
    }, _this.setBrowserStorageSupportedState = (0, _es6PromiseDebounce2.default)(function (browserStorageSupported) {
      return _this.setState({ browserStorageSupported: browserStorageSupported });
    }, 600), _this.handleAlertDismiss = function (event) {
      if (event) {
        event.preventDefault();
      }

      // Router.replace('/');
    }, _this.handlesOnEmailChange = function (event) {
      if (event) {
        event.preventDefault();
        // should add some validator before setState in real use cases
        _this.setState({ email: event.target.value.trim() });
      }
    }, _this.handlesOnPasswordChange = function (event) {
      if (event) {
        event.preventDefault();
        // should add some validator before setState in real use cases
        _this.setState({ password: event.target.value.trim() });
      }
    }, _this.handlesOnLogin = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var _this$props, logUserIfNeeded, query, _this$state, email, password, userLogin, response, _response$payload$dat, token, _user;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (event) {
                  event.preventDefault();
                }

                _this$props = _this.props, logUserIfNeeded = _this$props.logUserIfNeeded, query = _this$props.url.query;
                _this$state = _this.state, email = _this$state.email, password = _this$state.password;
                userLogin = {
                  login: email,
                  password: password
                };
                _context.prev = 4;
                _context.next = 7;
                return logUserIfNeeded(userLogin);

              case 7:
                response = _context.sent;
                _response$payload$dat = response.payload.data, token = _response$payload$dat.token, _user = _response$payload$dat.user;

                _auth2.default.setToken(token);
                _auth2.default.setUserInfo(_user);

                // test if we were redirected to login from a private page, redirect back to where we were:

                if (!query.from) {
                  _context.next = 13;
                  break;
                }

                return _context.abrupt('return', _index2.default.push({ pathname: query.from }));

              case 13:

                // redirect to home otherwise:
                _index2.default.push({ pathname: '/' }); // back to Home
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](4);

                /* eslint-disable no-console */
                console.error('login went wrong..., error: ', _context.t0);
              /* eslint-enable no-console */

              case 19:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 16]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.goHome = function (event) {
      if (event) {
        event.preventDefault();
      }

      _index2.default.push({ pathname: '/' });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // #region default PropTypes

  // #endregion

  // #region state initialization


  (0, _createClass3.default)(Login, [{
    key: 'componentDidMount',

    // #endregion

    // #region component lifecycle methods
    value: function componentDidMount() {
      var disconnectUser = this.props.disconnectUser;

      var browserStorageSupported = _auth2.default.supportsLocalStorage() && _auth2.default.supportsSessionStorage();

      this.setBrowserStorageSupportedState(browserStorageSupported);

      if (browserStorageSupported) {
        disconnectUser(); // diconnect user: remove token and user info
      }
    }
  }, {
    key: 'render',

    // #endregion
    value: function render() {
      var _state = this.state,
          email = _state.email,
          password = _state.password,
          browserStorageSupported = _state.browserStorageSupported;
      var _props = this.props,
          isLogging = _props.isLogging,
          classes = _props.classes;

      return _react2.default.createElement(_Layout2.default, null, _react2.default.createElement('div', { className: 'content' }, _react2.default.createElement(_Grid2.default, {
        container: true,
        direction: 'column',
        justify: 'center',
        alignItems: 'center',
        spacing: 16
      }, _react2.default.createElement(_Grid2.default, { item: true, md: 8, xs: 12 }, browserStorageSupported && _react2.default.createElement('div', null, _react2.default.createElement(_Typography2.default, { type: 'title', gutterBottom: true }, 'Login'), _react2.default.createElement(_Form.FormControl, { fullWidth: true, className: classes.formControl }, _react2.default.createElement(_Input.InputLabel, { htmlFor: 'inputEmail' }, 'Email'), _react2.default.createElement(_Input2.default, {
        id: 'inputEmail',
        value: email,
        placeholder: 'your email'
        // onChange={this.handlesOnEmailChange}
        , onInput: this.handlesOnEmailChange // browser autofill would not fire onChange
        , startAdornment: _react2.default.createElement(_Input.InputAdornment, { position: 'start' }, _react2.default.createElement(_MailOutline2.default, null))
      })), _react2.default.createElement(_Form.FormControl, { fullWidth: true, className: classes.formControl }, _react2.default.createElement(_Input.InputLabel, { htmlFor: 'inputPassword' }, 'Password'), _react2.default.createElement(_Input2.default, {
        id: 'inputPassword',
        value: password,
        placeholder: 'your password'
        // onChange={this.handlesOnPasswordChange}
        , onInput: this.handlesOnPasswordChange // browser autofill would not fire onChange
        , startAdornment: _react2.default.createElement(_Input.InputAdornment, { position: 'start' }, _react2.default.createElement(_LockOutline2.default, null))
      })), _react2.default.createElement('div', { className: 'form-group' }, _react2.default.createElement(_Grid2.default, {
        item: true,
        lg: 10
        // lgOffset={2}
      }, _react2.default.createElement('div', { className: classes.formButtonContainer }, _react2.default.createElement(_Button2.default, {
        raised: true,
        color: 'accent'
        // outline
        , disabled: isLogging,
        onClick: this.handlesOnLogin
      }, isLogging ? _react2.default.createElement('span', null, 'login in... \xA0', _react2.default.createElement('i', { className: 'fa fa-spinner fa-pulse fa-fw' })) : _react2.default.createElement('span', null, 'Login')))))), _react2.default.createElement(_Snackbar2.default, {
        anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
        open: !browserStorageSupported,
        onRequestClose: this.handleAlertDismiss,
        transition: function transition(props) {
          return _react2.default.createElement(_Slide2.default, (0, _extends3.default)({ direction: 'up' }, props));
        },
        SnackbarContentProps: {
          'aria-describedby': 'login-failed-container'
        },
        message: _react2.default.createElement('div', { id: 'login-failed-container' }, _react2.default.createElement('h4', null, _react2.default.createElement('i', {
          className: 'fa fa-exclamation-triangle',
          'aria-hidden': 'true'
        }), ' ', '\xA0 Cookies are disabled on your browser!'), _react2.default.createElement('br', null), _react2.default.createElement('p', null, 'Cookies are necessary to ensure application delivers the best experience and security.'), _react2.default.createElement('p', null, 'You can\'t signin or signout this application until you enable cookie in your navigator.'), _react2.default.createElement('br', null), _react2.default.createElement('p', null, _react2.default.createElement(_Button2.default, { onClick: this.handleAlertDismiss }, 'Back to Home')))
      }))), browserStorageSupported && _react2.default.createElement(_Grid2.default, {
        container: true,
        direction: 'column',
        justify: 'center',
        alignItems: 'center',
        spacing: 16
      }, _react2.default.createElement(_Grid2.default, { item: true, md: 8, xs: 12 }, _react2.default.createElement('div', { className: 'pull-right' }, _react2.default.createElement(_Button2.default, { onClick: this.goHome }, 'back to home'))))));
    }
    // #endregion

    // #region storage not supported methods

    // #endregion

    // #region input change methods

    // #endregion

    // #region on login click

    // #endregion

    // #region on go back home click

  }]);

  return Login;
}(_react.PureComponent);

// #region redux state and dispatch map to props


Login.defaultProps = {
  isFetching: false,
  isLogging: false
};
var mapStateToProps = function mapStateToProps(state) {
  return {
    // userAuth:
    isAuthenticated: state.userAuth.isAuthenticated,
    isFetching: state.userAuth.isFetching,
    isLogging: state.userAuth.isLogging
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _extends3.default)({}, (0, _redux.bindActionCreators)((0, _extends3.default)({}, userAuthActions), dispatch));
};
// #endregion

exports.default = (0, _compose2.default)((0, _nextReduxWrapper2.default)(_configureStore2.default, mapStateToProps, mapDispatchToProps), _withRoot2.default, (0, _styles.withStyles)(styles))(Login);