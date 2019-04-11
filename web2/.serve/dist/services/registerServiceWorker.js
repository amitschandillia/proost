'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-process-env */

// no more used since using workbox (it does the job for us)
var registerServiceWorker = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var _this = this;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(process.env === 'production')) {
              _context2.next = 3;
              break;
            }

            if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
              window.addEventListener('load', (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return navigator.serviceWorker.register('/sw');

                      case 3:
                        _context.next = 8;
                        break;

                      case 5:
                        _context.prev = 5;
                        _context.t0 = _context['catch'](0);

                        /* eslint-disable no-console */
                        console.error('Service worker registration failed, error: ', _context.t0);
                      /* eslint-enable no-console */

                      case 8:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[0, 5]]);
              })));
            } else {
              /* eslint-disable no-console */
              console.log('Service worker is not supported...');
              /* eslint-enable no-console */
            }
            return _context2.abrupt('return');

          case 3:
            return _context2.abrupt('return');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function registerServiceWorker() {
    return _ref.apply(this, arguments);
  };
}();

exports.default = registerServiceWorker;