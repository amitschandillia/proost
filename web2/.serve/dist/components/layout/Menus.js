'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _link = require('next/dist/lib/link.js');

var _link2 = _interopRequireDefault(_link);

var _List = require('material-ui/List');

var _Info = require('material-ui-icons/Info');

var _Info2 = _interopRequireDefault(_Info);

var _Home = require('material-ui-icons/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Lock = require('material-ui-icons/Lock');

var _Lock2 = _interopRequireDefault(_Lock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region flow types

// #endregion

// #region imports
var Menus = function (_PureComponent) {
  (0, _inherits3.default)(Menus, _PureComponent);

  function Menus() {
    (0, _classCallCheck3.default)(this, Menus);

    return (0, _possibleConstructorReturn3.default)(this, (Menus.__proto__ || (0, _getPrototypeOf2.default)(Menus)).apply(this, arguments));
  }

  (0, _createClass3.default)(Menus, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', null, _react2.default.createElement(_link2.default, { prefetch: true, href: '/', passHref: true }, _react2.default.createElement(_List.ListItem, { button: true }, _react2.default.createElement(_List.ListItemIcon, null, _react2.default.createElement(_Home2.default, null)), _react2.default.createElement(_List.ListItemText, { primary: 'Home' }))), _react2.default.createElement(_link2.default, { prefetch: true, href: '/protected', passHref: true }, _react2.default.createElement(_List.ListItem, { button: true }, _react2.default.createElement(_List.ListItemIcon, null, _react2.default.createElement(_Lock2.default, null)), _react2.default.createElement(_List.ListItemText, { primary: 'Protected' }))), _react2.default.createElement(_link2.default, { prefetch: true, href: '/about', passHref: true }, _react2.default.createElement(_List.ListItem, { button: true }, _react2.default.createElement(_List.ListItemIcon, null, _react2.default.createElement(_Info2.default, null)), _react2.default.createElement(_List.ListItemText, { primary: 'About' }))));
    }
  }]);

  return Menus;
}(_react.PureComponent);
// import Router                from 'next/router';
exports.default = Menus;