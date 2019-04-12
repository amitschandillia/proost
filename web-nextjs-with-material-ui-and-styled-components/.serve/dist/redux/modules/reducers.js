'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducers = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _redux = require('redux');

var _fakeModuleWithFetch = require('./fakeModuleWithFetch');

var _fakeModuleWithFetch2 = _interopRequireDefault(_fakeModuleWithFetch);

var _userAuth = require('./userAuth');

var _userAuth2 = _interopRequireDefault(_userAuth);

var _persistStore = require('./persistStore');

var _persistStore2 = _interopRequireDefault(_persistStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = {
  fakeModuleWithFetch: _fakeModuleWithFetch2.default,
  userAuth: _userAuth2.default,
  persistStore: _persistStore2.default
};

exports.default = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers));