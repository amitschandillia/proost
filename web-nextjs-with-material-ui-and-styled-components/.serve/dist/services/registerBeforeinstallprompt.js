'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-process-env:0 */

/**
 * add event listener beforeinstallprompt: PWA prompt user install app (add to screen)
 * @returns {Function} module
 */
function registerBeforeinstallprompt() {
  var _this = this;

  if (process.env === 'production') {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(e) {
          var choiceResult;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return e.userChoice;

                case 3:
                  choiceResult = _context.sent;

                  if (choiceResult.outcome === 'dismissed') {
                    /* eslint-disable no-console */
                    console.log('User cancelled home screen install');
                    /* eslint-enable no-console */
                  } else {
                    /* eslint-disable no-console */
                    console.log('User added to home screen');
                    /* eslint-enable no-console */
                  }
                  _context.next = 10;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  /* eslint-disable no-console */
                  console.error('user choice prompt promise failed to resolve, error: ', _context.t0);
                /* eslint-enable no-console */

                case 10:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 7]]);
        }));

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    }
  }
}

exports.default = registerBeforeinstallprompt;