'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxPersist = require('redux-persist');

var _storages = require('redux-persist/storages');

var _reducers = require('../modules/reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _fetchMiddleware = require('../middleware/fetchMiddleware');

var _fetchMiddleware2 = _interopRequireDefault(_fetchMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #region createStore : enhancer
//  weak

var enhancer = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, _fetchMiddleware2.default), (0, _reduxPersist.autoRehydrate)());
// #endregion

// #region store initialization
function configureStore(initialState) {
  var store = (0, _redux.createStore)(_reducers2.default, initialState, enhancer);

  // begin periodically persisting the store
  (0, _reduxPersist.persistStore)(store, { storage: _storages.asyncLocalStorage });

  // OPTIONAL: you can blacklist reducers to avoid them to persist, so call
  // persistStore(
  //   store,
  //   {blacklist: ['someTransientReducer']},
  //   () => {
  //   console.log('rehydration complete')
  //   }
  // );

  return store;
}
// #endregion