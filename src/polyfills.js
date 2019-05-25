/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint global-require: 0 */
/* eslint no-extend-native: 0 */

require('ima-babel6-polyfill'); // fix super constructor call for ie <= 10, see https://phabricator.babeljs.io/T3041
require('core-js/es/array/entries');
require('core-js/es/array/fill');
require('core-js/es/array/find');
require('core-js/es/array/find-index');
require('core-js/es/array/from');
require('core-js/es/array/includes');
require('core-js/es/object/assign');
require('core-js/es/object/entries');
require('core-js/es/object/is');
require('core-js/es/object/values');
require('core-js/es/string/starts-with');
require('core-js/es/string/includes');
require('core-js/es/promise');
require('core-js/es/symbol');
require('core-js/es/map');
require('core-js/es/set');
require('core-js/es/weak-map');

if (typeof window !== 'undefined') {
    require('matches-selector-polyfill/dist/matches-selector-polyfill.js');
    require('raf').polyfill(); // window.requestAnimationFrame for ie <= 10 & android 4.0..4.3
}
