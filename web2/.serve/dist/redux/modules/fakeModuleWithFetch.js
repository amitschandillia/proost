'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var currentTime = (0, _moment2.default)().format();

  switch (action.type) {
    case REQUEST_FAKE_FETCH:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: true
      });

    case RECEIVED_FAKE_FETCH:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: false,
        data: [].concat((0, _toConsumableArray3.default)(action.payload))
      });

    case ERROR_FAKE_FETCH:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: false,
        error: action.error ? (0, _extends3.default)({}, action.error) : {}
      });

    default:
      return state;
  }
};

exports.fakeFetchIfNeeded = fakeFetchIfNeeded;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _fakeAPI = require('../../mock/fakeAPI.json');

var _fakeAPI2 = _interopRequireDefault(_fakeAPI);

var _appConfig = require('../../config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _fetchTools = require('../../services/fetchTools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region CONSTANTS


// #region imports
var REQUEST_FAKE_FETCH = 'REQUEST_FAKE_FETCH';
var RECEIVED_FAKE_FETCH = 'RECEIVED_FAKE_FETCH';
var ERROR_FAKE_FETCH = 'ERROR_FAKE_FETCH';
// #endregion

// #region REDUCER
var initialState = {
  isFetching: false,
  actionTime: '',
  data: [],
  error: {}
};

// #endregion

// #region ACTIONS CREATORS
function fakeFetch() {
  return function (dispatch) {
    var shouldFetchMock = _appConfig2.default.DEV_MODE;
    var fetchType = shouldFetchMock ? 'FETCH_MOCK' : 'FETCH';
    var mockResult = _fakeAPI2.default;

    var url = (0, _fetchTools.getLocationOrigin)() + '/' + _appConfig2.default.api.fakeEndPoint;
    var method = 'get';
    var options = {};

    // fetch middleware
    // -> you handles pure front or with back-end asyncs just by disaptching a single object
    //   -> just change config: AppConfig.DEV_MODE
    return _promise2.default.resolve(dispatch({
      // type name is not important here since fetchMiddleware will intercept this action:
      type: 'FETCH_MIDDLEWARE',
      // here are fetch middleware props:
      fetch: {
        type: fetchType,
        actionTypes: {
          request: REQUEST_FAKE_FETCH,
          success: RECEIVED_FAKE_FETCH,
          fail: ERROR_FAKE_FETCH
        },
        // props only used when type = FETCH_MOCK:
        mockResult: mockResult,
        // props only used when type = FETCH:
        url: url,
        method: method,
        options: options
      }
    }));
  };
}

function fakeFetchIfNeeded() {
  return function (dispatch, getState) {
    if (shouldFakeFetch(getState())) {
      return dispatch(fakeFetch());
    }
    return _promise2.default.resolve();
  };
}

function shouldFakeFetch(state) {
  var isFetching = state.fakeModuleWithFetch.isFetching;
  // prevents fetching twice while already fetching:
  if (isFetching) {
    return false;
  }
  return true;
}
// #endregion