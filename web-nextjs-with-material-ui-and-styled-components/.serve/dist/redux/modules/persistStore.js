'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.REHYDRATE:
      {
        var incoming = action.payload.myReducer;
        if (incoming) {
          return (0, _extends3.default)({}, state, incoming);
        }
        return state;
      }

    default:
      return state;
  }
};

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _constants = require('redux-persist/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #endregion
var initialState = {};

/**
 * redux-persist reducer rehydration logic
 *
 * NOTE: you need to write on your own!!!
 *
 * @export
 * @param {any} [state=initialState] state
 * @param {any} action action
 * @returns {any} state
 */


// #region imports