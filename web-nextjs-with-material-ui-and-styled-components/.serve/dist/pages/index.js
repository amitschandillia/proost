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

var _index = require('next/dist/lib/router/index.js');

var _index2 = _interopRequireDefault(_index);

var _redux = require('redux');

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _Typography = require('material-ui/Typography');

var _Typography2 = _interopRequireDefault(_Typography);

var _styles = require('material-ui/styles');

var _nextReduxWrapper = require('next-redux-wrapper');

var _nextReduxWrapper2 = _interopRequireDefault(_nextReduxWrapper);

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _configureStore = require('../redux/store/configureStore');

var _configureStore2 = _interopRequireDefault(_configureStore);

var _withRoot = require('../HOC/withRoot');

var _withRoot2 = _interopRequireDefault(_withRoot);

var _Layout = require('../components/layout/Layout');

var _Layout2 = _interopRequireDefault(_Layout);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region flow types

// #endregion

// #region styles
var styles = {
  root: {
    textAlign: 'center',
    paddingTop: 200
  }
};
// #endregion

// #region imports
var Index = function (_PureComponent) {
  (0, _inherits3.default)(Index, _PureComponent);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call.apply(_ref, [this].concat(args))), _this), _this.handleRequestClose = function () {
      _this.setState({
        open: false
      });
    }, _this.handleClick = function () {
      _index2.default.push('/login');
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Index, [{
    key: 'render',

    // #region props initialization
    // static async getInitialProps({
    //   isServer,
    //   store
    // }: InitialProps) {
    //   const SIDE = isServer ? 'SERVER SIDE' : 'FRONT SIDE';

    //   try {
    //     const response = await store.dispatch(fakeFetchActions.fakeFetchIfNeeded());
    //     const {
    //       payload: {
    //         data
    //       }
    //     } = response;
    //     // NOTE: you will see this log in your server console (where you `npm run dev`):
    //     /* eslint-disable no-console */
    //     console.log(`getInitialProps - ${SIDE} - fake fetch result: `, data);
    //   } catch (error) {
    //     console.error(`getInitialProps - ${SIDE} - fake fetch failed: `, error);
    //     /* eslint-enable no-console */
    //   }
    // }
    // #endregion

    // #region component lifecycle methods
    value: function render() {
      return _react2.default.createElement(_Layout2.default, null, _react2.default.createElement(_Typography2.default, { type: 'display1', gutterBottom: true }, 'Material-UI'), _react2.default.createElement(_Typography2.default, { type: 'subheading', gutterBottom: true }, 'example project'), _react2.default.createElement(_Button2.default, { raised: true, color: 'accent', onClick: this.handleClick }, 'Login'));
    }
    // #endregion

  }]);

  return Index;
}(_react.PureComponent);

// #region redux state and dispatch map to props


var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _extends3.default)({}, (0, _redux.bindActionCreators)({}, dispatch));
};
// #endregion

exports.default = (0, _compose2.default)((0, _nextReduxWrapper2.default)(_configureStore2.default, mapStateToProps, mapDispatchToProps), _withRoot2.default, (0, _styles.withStyles)(styles))(Index);