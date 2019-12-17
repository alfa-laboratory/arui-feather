/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint global-require: 0 */
/* eslint no-extend-native: 0 */

require('core-js/fn/array/fill');
require('core-js/fn/array/find');
require('core-js/fn/array/find-index');
require('core-js/fn/array/from');
require('core-js/fn/array/includes');
require('core-js/fn/object/assign');
require('core-js/fn/object/is');
require('core-js/fn/object/values');
require('core-js/es6/promise');
require('core-js/es6/set');
require('core-js/es6/map');
require('core-js/es6/weak-map');
require('core-js/es6/symbol');

if (typeof window !== 'undefined') {
    require('raf').polyfill(); // window.requestAnimationFrame for ie <= 10 & android 4.0..4.3
}
