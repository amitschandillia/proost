'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _document = require('next/dist/server/document.js');

var _document2 = _interopRequireDefault(_document);

var _JssProvider = require('react-jss/lib/JssProvider');

var _JssProvider2 = _interopRequireDefault(_JssProvider);

var _getContext = require('../styles/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _registerServiceWorker = require('../services/registerServiceWorker');

var _registerServiceWorker2 = _interopRequireDefault(_registerServiceWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// #endregion

// #region global vars or polyfill

if (process.browser) {
  // eslint-disable-next-line global-require
  require('smoothscroll-polyfill').polyfill();
  // force polyfill
  window.__forceSmoothScrollPolyfill__ = true;
}
// #endregion

// #region flow types

// #endregion

// #region imports
var RootDocument = function (_Document) {
  (0, _inherits3.default)(RootDocument, _Document);

  function RootDocument() {
    (0, _classCallCheck3.default)(this, RootDocument);

    return (0, _possibleConstructorReturn3.default)(this, (RootDocument.__proto__ || (0, _getPrototypeOf2.default)(RootDocument)).apply(this, arguments));
  }

  (0, _createClass3.default)(RootDocument, [{
    key: 'componentDidMount',

    // #endregion

    // #region component lifecycle methods
    value: function componentDidMount() {
      // register service worker:
      (0, _registerServiceWorker2.default)();
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('html', { lang: 'en', dir: 'ltr' }, _react2.default.createElement(_document.Head, null, _react2.default.createElement('title', null, 'Next PWA Material UI Starter'), _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }), _react2.default.createElement('meta', { charSet: 'utf-8' }), _react2.default.createElement('link', {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500'
      }), _react2.default.createElement('meta', {
        name: 'application-name',
        content: 'react-redux-nextjs-material-ui-pwa-starter'
      }), _react2.default.createElement('link', { rel: 'manifest', href: 'static/manifest.json' }), _react2.default.createElement('link', {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: 'static/favicon-32x32.png'
      }), _react2.default.createElement('link', {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: 'static/favicon-16x16.png'
      }), _react2.default.createElement('meta', { name: 'theme-color', content: '#1967be' }), _react2.default.createElement('link', {
        rel: 'mask-icon',
        href: 'static/safari-pinned-tab.svg',
        color: '#1967be'
      }), _react2.default.createElement('meta', { name: 'apple-mobile-web-app-title', content: 'Next PWA Starter' }), _react2.default.createElement('link', {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'static/apple-touch-icon.png'
      }), _react2.default.createElement('link', {
        rel: 'apple-touch-startup-image',
        href: 'static/apple-touch-icon.png'
      }), _react2.default.createElement('meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }), _react2.default.createElement('meta', {
        name: 'apple-mobile-web-app-title',
        content: 'react-redux-nextjs-material-ui-pwa-starter'
      }), _react2.default.createElement('meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }), _react2.default.createElement('style', null, '\n            {/* next js fix for div surrounding #__next */}\n            html,\n            body,\n            body > div:first-child,\n            #__next,\n            #__next > div:first-child  {\n              height: 100%;\n              margin: 0;\n            }\n          ')), _react2.default.createElement('body', null, _react2.default.createElement(_document.Main, null), _react2.default.createElement(_document.NextScript, null)));
    }
    // #endregion

  }], [{
    key: 'getInitialProps',

    // #region props initialization
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(initProps) {
        var context, page;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // Resolution order
                //
                // On the server:
                // 1. page.getInitialProps
                // 2. document.getInitialProps
                // 3. page.render
                // 4. document.render
                //
                // On the server with error:
                // 2. document.getInitialProps
                // 3. page.render
                // 4. document.render
                //
                // On the client
                // 1. page.getInitialProps
                // 3. page.render

                // Get the context to collected side effects.
                context = (0, _getContext2.default)();
                page = initProps.renderPage(function (Component) {
                  return function (props) {
                    return _react2.default.createElement(_JssProvider2.default, { registry: context.sheetsRegistry, jss: context.jss }, _react2.default.createElement(Component, props));
                  };
                });
                return _context.abrupt('return', (0, _extends3.default)({}, page, {
                  stylesContext: context,
                  styles: _react2.default.createElement('style', {
                    id: 'jss-server-side'
                    // eslint-disable-next-line react/no-danger
                    , dangerouslySetInnerHTML: {
                      __html: context.sheetsRegistry.toString()
                    }
                  })
                }));

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  return RootDocument;
}(_document2.default);

exports.default = RootDocument;