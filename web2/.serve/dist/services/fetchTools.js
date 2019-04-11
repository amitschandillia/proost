'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLocationOrigin = getLocationOrigin;


/**
 * getLocationOrigin returns dynamically base url
 *
 * @export
 * @returns {string} location origin
 */
function getLocationOrigin() {
  if (typeof window === 'undefined') {
    return '';
  }

  if (!window.location.origin) {
    window.location.origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
  }

  return window.location.origin;
}