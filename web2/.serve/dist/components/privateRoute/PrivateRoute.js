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

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region flow types

// #endregion

var Private = function (_PureComponent) {
  (0, _inherits3.default)(Private, _PureComponent);

  function Private() {
    (0, _classCallCheck3.default)(this, Private);

    return (0, _possibleConstructorReturn3.default)(this, (Private.__proto__ || (0, _getPrototypeOf2.default)(Private)).apply(this, arguments));
  }

  (0, _createClass3.default)(Private, [{
    key: 'componentDidMount',

    // #region component lifecycle methods
    value: function componentDidMount() {
      var fromPath = this.props.fromPath;

      var userIsAuthenticated = this.isAuthenticated();
      var userTokenExpired = this.isExpired();

      var RoutePayload = {
        pathname: '/login',
        query: { from: fromPath }
      };

      if (!userIsAuthenticated) {
        return _index2.default.replace(RoutePayload);
      }

      if (userTokenExpired) {
        return _index2.default.replace(RoutePayload);
      }

      return true;
    }
    // #region

  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react2.default.createElement('div', null, children);
    }
    // #endregion

    // #region authentication check methods

  }, {
    key: 'isAuthenticated',
    value: function isAuthenticated() {
      var checkUserHasId = function checkUserHasId(user) {
        return user && user.id;
      };
      var user = _auth2.default.getUserInfo() ? _auth2.default.getUserInfo() : null;
      var isAuthenticated = _auth2.default.getToken() && checkUserHasId(user) ? true : false;
      return isAuthenticated;
    }
  }, {
    key: 'isExpired',
    value: function isExpired() {
      /* eslint-disable no-console */
      // comment me:
      console.log('token expires: ', _auth2.default.getTokenExpirationDate(_auth2.default.getToken()));
      /* eslint-enable no-console */
      return _auth2.default.isExpiredToken(_auth2.default.getToken());
    }
    // #endregion

  }]);

  return Private;
}(_react.PureComponent);

// #region imports


Private.defaultProps = {
  fromPath: '/'
};

exports.default = Private;