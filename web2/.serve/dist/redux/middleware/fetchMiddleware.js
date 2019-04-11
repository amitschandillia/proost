'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FETCH = exports.FETCH_MOCK = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region constants
var FETCH_MOCK = exports.FETCH_MOCK = 'FETCH_MOCK';

// #region imports
var FETCH = exports.FETCH = 'FETCH';
// #endregion

// #region flow type

// #endregion

// //////////////////////////////
// ###### HOW TO USE
// //////////////////////////////
// CASE: FETCH_MOCK mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH_MOCK',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    mockResult: any
//  }
// }
//
// ---------------------------
// CASE: FETCH mode
// in any action just add fetch object like:
// {
//  fetch: {
//    type: 'FETCH',
//    actionTypes: {
//      request: 'TYPE_FOR_REQUEST',
//      success: 'TYPE_FOR_RECEIVED',
//      fail: 'TYPE_FOR_ERROR',
//    },
//    url: 'an url',
//    method: 'get',  // lower case, one of 'get', 'post'...
//    headers: {}     // OPTIONAL CONTENT like: data: { someprop: 'value ...}
//    options: {}     // OPTIONAL CONTENT like: Authorization: 'Bearer _A_TOKEN_'
//  }
// }
//

// #region middleware function
var fetchMiddleware = function fetchMiddleware(store) {
  return function (next) {
    return function (action) {
      if (!action.fetch) {
        return next(action);
      }

      if (!action.fetch.type || !action.fetch.type === FETCH_MOCK || !action.fetch.type === FETCH) {
        return next(action);
      }

      if (!action.fetch.actionTypes) {
        return next(action);
      }

      /**
       * fetch mock
       * @type {[type]}
       */
      if (action.fetch.type === FETCH_MOCK) {
        if (!action.fetch.mockResult) {
          throw new Error('Fetch middleware require a mockResult payload when type is "FETCH_MOCK"');
        }

        var _action$fetch = action.fetch,
            _action$fetch$actionT = _action$fetch.actionTypes,
            _request = _action$fetch$actionT.request,
            _success = _action$fetch$actionT.success,
            _mockResult = _action$fetch.mockResult;

        // request

        store.dispatch({ type: _request });

        // received successful for mock
        return _promise2.default.resolve(store.dispatch({
          type: _success,
          payload: {
            status: 200,
            data: _mockResult
          }
        }));
      }

      if (action.fetch.type === FETCH) {
        var _action$fetch2 = action.fetch,
            _action$fetch2$action = _action$fetch2.actionTypes,
            _request2 = _action$fetch2$action.request,
            _success2 = _action$fetch2$action.success,
            _fail = _action$fetch2$action.fail,
            _url = _action$fetch2.url,
            _method = _action$fetch2.method,
            _headers = _action$fetch2.headers,
            _options = _action$fetch2.options;

        // request

        store.dispatch({ type: _request2 });

        // fetch server (success or fail)
        // returns a Promise
        return _axios2.default.request((0, _extends3.default)({
          method: _method,
          url: _url,
          withCredentials: true,
          headers: (0, _extends3.default)({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Acces-Control-Allow-Origin': '*'
          }, _headers)
        }, _options)).then(function (data) {
          return store.dispatch({ type: _success2, payload: data });
        }).catch(function (err) {
          store.dispatch({ type: _fail, error: err.response });
          return _promise2.default.reject(err.response);
        });
      }
      return next(action);
    };
  };
};
// #endregion

exports.default = fetchMiddleware;