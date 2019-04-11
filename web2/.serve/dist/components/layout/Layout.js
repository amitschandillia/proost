'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _reactRedux = require('react-redux');

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _styles = require('material-ui/styles');

var _Drawer = require('material-ui/Drawer');

var _Drawer2 = _interopRequireDefault(_Drawer);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _Toolbar = require('material-ui/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _IconButton = require('material-ui/IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Hidden = require('material-ui/Hidden');

var _Hidden2 = _interopRequireDefault(_Hidden);

var _Divider = require('material-ui/Divider');

var _Divider2 = _interopRequireDefault(_Divider);

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _AccountCircle = require('material-ui-icons/AccountCircle');

var _AccountCircle2 = _interopRequireDefault(_AccountCircle);

var _Menu3 = require('material-ui-icons/Menu');

var _Menu4 = _interopRequireDefault(_Menu3);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _Menus = require('./Menus');

var _Menus2 = _interopRequireDefault(_Menus);

var _styles2 = require('./styles');

var _styles3 = _interopRequireDefault(_styles2);

var _userAuth = require('../../redux/modules/userAuth');

var userAuthActions = _interopRequireWildcard(_userAuth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region flow types

// #endregion

var Layout = function (_PureComponent) {
  (0, _inherits3.default)(Layout, _PureComponent);

  function Layout() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Layout);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Layout.__proto__ || (0, _getPrototypeOf2.default)(Layout)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mobileOpen: false,
      anchorEl: null
    }, _this.handleDrawerToggle = function () {
      return _this.setState(function (_ref2) {
        var prevMobileOpen = _ref2.mobileOpen;
        return {
          mobileOpen: !prevMobileOpen
        };
      });
    }, _this.handleMenu = function (event) {
      _this.setState({ anchorEl: event.currentTarget });
    }, _this.handleRequestClose = function () {
      _this.setState({ anchorEl: null });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }
  // #region state initialization


  (0, _createClass3.default)(Layout, [{
    key: 'render',

    // #endregion

    // #region component lifecycle methods

    // #endregion
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          theme = _props.theme,
          children = _props.children,
          isAuthenticated = _props.isAuthenticated,
          disconnectUser = _props.disconnectUser;
      var anchorEl = this.state.anchorEl;

      var drawer = _react2.default.createElement('div', null, _react2.default.createElement('div', { className: classes.drawerHeader }), _react2.default.createElement(_Divider2.default, null), _react2.default.createElement(_Menus2.default, null), _react2.default.createElement(_Divider2.default, null));

      var open = Boolean(anchorEl);

      return _react2.default.createElement('div', { className: classes.root }, _react2.default.createElement('div', { className: classes.appFrame }, _react2.default.createElement(_AppBar2.default, { className: classes.appBar, elevation: 0 }, _react2.default.createElement(_Toolbar2.default, null, _react2.default.createElement(_IconButton2.default, {
        color: 'contrast',
        'aria-label': 'open drawer',
        onClick: this.handleDrawerToggle,
        className: classes.navIconHide
      }, _react2.default.createElement(_Menu4.default, null)), _react2.default.createElement(_Typography2.default, { type: 'title', color: 'inherit', noWrap: true }, 'PWA Next Material UI'), _react2.default.createElement('div', { className: classes.flexible }), isAuthenticated ? _react2.default.createElement('div', null, _react2.default.createElement(_IconButton2.default, {
        'aria-owns': open ? 'menu-appbar' : null,
        'aria-haspopup': 'true',
        onClick: this.handleMenu,
        color: 'contrast'
      }, _react2.default.createElement(_AccountCircle2.default, null)), _react2.default.createElement(_Menu2.default, {
        id: 'menu-appbar',
        anchorEl: anchorEl,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        open: open,
        onRequestClose: this.handleRequestClose
      }, _react2.default.createElement(_Menu.MenuItem, { onClick: this.handleRequestClose }, 'Profile'), _react2.default.createElement(_Menu.MenuItem, { onClick: this.handleRequestClose }, 'My account'), _react2.default.createElement(_Menu.MenuItem, { onClick: disconnectUser }, 'Disconnect'))) : _react2.default.createElement('div', null, _react2.default.createElement(_link2.default, { prefetch: true, href: '/login', passHref: true }, _react2.default.createElement(_IconButton2.default, {
        'aria-owns': open ? 'menu-appbar' : null,
        'aria-haspopup': 'true',
        onClick: this.handleMenu,
        color: 'contrast'
      }, _react2.default.createElement(_AccountCircle2.default, null)))))), _react2.default.createElement(_Hidden2.default, { mdUp: true }, _react2.default.createElement(_Drawer2.default, {
        type: 'temporary',
        anchor: theme.direction === 'rtl' ? 'right' : 'left',
        open: this.state.mobileOpen,
        classes: {
          paper: classes.drawerPaper
        },
        onRequestClose: this.handleDrawerToggle,
        ModalProps: {
          keepMounted: true // Better open performance on mobile.
        }
      }, drawer)), _react2.default.createElement(_Hidden2.default, { mdDown: true, implementation: 'css' }, _react2.default.createElement(_Drawer2.default, {
        type: 'permanent',
        open: true,
        classes: {
          paper: classes.drawerPaper
        }
      }, drawer)), _react2.default.createElement('main', { className: classes.content }, children)));
    }
    // #endregion

    // #region drawer management

    // #endregion

    // #region appBar action menu

  }]);

  return Layout;
}(_react.PureComponent);

// #region redux state and dispatch map to props


// #region imports
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

exports.default = (0, _compose2.default)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps), (0, _styles.withStyles)(_styles3.default, { withTheme: true }))(Layout);