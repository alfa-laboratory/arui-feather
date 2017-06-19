/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint global-require: 0 */
/* eslint no-extend-native: 0 */

const ArrayFind = require('array.prototype.find');
const ArrayFrom = require('array-from');
const ObjectIs = require('object-is');
require('es6-object-assign').polyfill();
require('es6-promise').polyfill();
require('es6-weak-map/implement'); // for autobind from core-decorators
require('array.prototype.fill');
require('ima-babel6-polyfill'); // fix super constructor call for ie <= 10, see https://phabricator.babeljs.io/T3041

if (typeof window !== 'undefined') {
    require('matches-selector-polyfill/dist/matches-selector-polyfill.js');
    require('raf').polyfill(); // window.requestAnimationFrame for ie <= 10 & android 4.0..4.3
}

if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: ArrayFind.getPolyfill()
    });
}

if (!Object.is) {
    Object.is = ObjectIs;
}

if (!Array.from) {
    Array.from = ArrayFrom;
}
