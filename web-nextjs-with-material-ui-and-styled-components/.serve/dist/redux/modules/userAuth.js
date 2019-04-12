'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var currentTime = (0, _moment2.default)().format();

  switch (action.type) {
    case CHECK_IF_USER_IS_AUTHENTICATED:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isAuthenticated: action.isAuthenticated,
        token: action.token || initialState.token,
        id: action.user && action.user.id ? action.user.id : initialState.id,
        login: action.user && action.user.login ? action.user.login : initialState.login,
        firstname: action.user && action.user.firstname ? action.user.firstname : initialState.firstname,
        lastname: action.user && action.user.lastname ? action.user.lastname : initialState.firstname
      });

    case DISCONNECT_USER:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isAuthenticated: false,
        token: initialState.token,
        id: initialState.id,
        login: initialState.login,
        firstname: initialState.firstname,
        lastname: initialState.lastname
      });

    // user login (get token and userInfo)
    case REQUEST_LOG_USER:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isLogging: true
      });

    case RECEIVED_LOG_USER:
      var userLogged = action.payload.data;

      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isAuthenticated: true,
        token: userLogged.token,
        id: userLogged.id,
        login: userLogged.login,
        firstname: userLogged.firstname,
        lastname: userLogged.lastname,
        isLogging: false
      });

    case ERROR_LOG_USER:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isAuthenticated: false,
        isLogging: false
      });

    // not used right now:
    case REQUEST_USER_INFOS_DATA:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: true
      });

    case RECEIVED_USER_INFOS_DATA:
      var userInfos = action.payload.data;

      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: false,
        id: userInfos.id,
        login: userInfos.login,
        firstname: userInfos.firstname,
        lastname: userInfos.lastname
      });

    case ERROR_USER_INFOS_DATA:
      return (0, _extends3.default)({}, state, {
        actionTime: currentTime,
        isFetching: false
      });

    default:
      return state;
  }
};

exports.disconnectUser = disconnectUser;
exports.checkUserIsConnected = checkUserIsConnected;
exports.logUserIfNeeded = logUserIfNeeded;
exports.fetchUserInfoDataIfNeeded = fetchUserInfoDataIfNeeded;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _appConfig = require('../../config/appConfig');

var _appConfig2 = _interopRequireDefault(_appConfig);

var _userInfosMock = require('../../mock/userInfosMock.json');

var _userInfosMock2 = _interopRequireDefault(_userInfosMock);

var _fetchTools = require('../../services/fetchTools');

var _auth = require('../../services/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region CONSTANTS
var REQUEST_USER_INFOS_DATA = 'REQUEST_USER_INFOS_DATA';

// #region imports

var RECEIVED_USER_INFOS_DATA = 'RECEIVED_USER_INFOS_DATA';
var ERROR_USER_INFOS_DATA = 'ERROR_USER_INFOS_DATA';

var REQUEST_LOG_USER = 'REQUEST_LOG_USER';
var RECEIVED_LOG_USER = 'RECEIVED_LOG_USER';
var ERROR_LOG_USER = 'ERROR_LOG_USER';

var CHECK_IF_USER_IS_AUTHENTICATED = 'CHECK_IF_USER_IS_AUTHENTICATED';

var DISCONNECT_USER = 'DISCONNECT_USER';
// #endregion

// #region REDUCER

var initialState = {
  // actions details
  isFetching: false,
  isLogging: false,
  time: '',

  // userInfos
  id: '',
  login: '',
  firstname: '',
  lastname: '',

  token: null,
  isAuthenticated: false // authentication status (token based auth)
};

// #endregion

// #region ACTIONS CREATORS

/**
 *
 * set user isAuthenticated to false and clear all app localstorage:
 *
 * @export
 * @returns {action} action
 */
function disconnectUser() {
  _auth2.default.clearUserInfo();
  _auth2.default.clearToken();
  return { type: DISCONNECT_USER };
}

/**
 *
 * check if user is connected by looking at locally stored
 * - token
 * - user fonrmation
 *
 * @export
 * @returns {action} action
 */
function checkUserIsConnected() {
  var token = _auth2.default.getToken();
  var user = _auth2.default.getUserInfo();
  var checkUserHasId = function checkUserHasId(obj) {
    return obj && obj._id;
  };
  var isAuthenticated = token && checkUserHasId(user) ? true : false;

  return (0, _extends3.default)({
    type: CHECK_IF_USER_IS_AUTHENTICATED,
    token: token
  }, user, {
    isAuthenticated: isAuthenticated
  });
}

/**
 *
 *  user login
 *
 * @param {string} login user login
 * @param {string} password usepasswordr
 * @returns {Promise<any>} promised action
 */
function logUser(login, password) {
  var _this = this;

  return function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
      var FETCH_TYPE, __SOME_LOGIN_API__, mockResult, url, method, headers, options;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              FETCH_TYPE = _appConfig2.default.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';
              __SOME_LOGIN_API__ = 'login';
              mockResult = _userInfosMock2.default; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)

              url = (0, _fetchTools.getLocationOrigin)() + '/' + __SOME_LOGIN_API__;
              method = 'post';
              headers = {};
              options = {
                credentials: 'same-origin',
                data: {
                  login: login,
                  password: password
                }
              };

              // fetchMiddleware (does: fetch mock, real fetch, dispatch 3 actions... for a minimum code on action creator!)

              return _context.abrupt('return', dispatch({
                type: 'FETCH_MIDDLEWARE',
                fetch: {
                  // common props:
                  type: FETCH_TYPE,
                  actionTypes: {
                    request: REQUEST_LOG_USER,
                    success: RECEIVED_LOG_USER,
                    fail: ERROR_LOG_USER
                  },
                  // mock fetch props:
                  mockResult: mockResult,
                  // real fetch props:
                  url: url,
                  method: method,
                  headers: headers,
                  options: options
                }
              }));

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x2) {
      return _ref.apply(this, arguments);
    };
  }();
}
function logUserIfNeeded(email, password) {
  return function (dispatch, getState) {
    if (shouldLogUser(getState())) {
      return dispatch(logUser(email, password));
    }
    return _promise2.default.resolve();
  };
}
function shouldLogUser(state) {
  var isLogging = state.userAuth.isLogging;
  if (isLogging) {
    return false;
  }
  return true;
}

/**
 * fetch user info
 *
 * NOTE: this shows a use-case of fetchMiddleware
 *@param {string} [id=''] user id
 * @returns {Promise<any>} returns fetch promise
 */
function fetchUserInfosData() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return function (dispatch) {
    var token = _auth2.default.getToken();
    var FETCH_TYPE = _appConfig2.default.DEV_MODE ? 'FETCH_MOCK' : 'FETCH';

    var mockResult = _userInfosMock2.default; // will be fetch_mock data returned (in case FETCH_TYPE = 'FETCH_MOCK', otherwise cata come from server)
    var url = (0, _fetchTools.getLocationOrigin)() + '/' + _appConfig2.default.API.users + '/' + id;
    var method = 'get';
    var headers = { authorization: 'Bearer ' + token };
    var options = { credentials: 'same-origin' }; // put options here (see axios options)

    return dispatch({
      type: 'FETCH_MIDDLEWARE',
      fetch: {
        // common props:
        type: FETCH_TYPE,
        actionTypes: {
          request: REQUEST_USER_INFOS_DATA,
          success: RECEIVED_USER_INFOS_DATA,
          fail: ERROR_USER_INFOS_DATA
        },
        // mock fetch props:
        mockResult: mockResult,
        // real fetch props:
        url: url,
        method: method,
        headers: headers,
        options: options
      }
    });
  };
}

function fetchUserInfoDataIfNeeded() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  return function (dispatch, getState) {
    if (shouldFetchUserInfoData(getState())) {
      return dispatch(fetchUserInfosData(id));
    }
    return _promise2.default.resolve();
  };
}

/**
 *
 * determine wether fetching should occur
 *
 * rules:
 * - should not fetch twice when already fetching
 * - ...more rules can be added
 *
 * @param {Object} state all redux state
 * @returns {boolean} flag
 */
function shouldFetchUserInfoData(state) {
  var userInfos = state.userAuth;
  if (userInfos.isFetching) {
    return false;
  }
  return true;
}

// #endregion