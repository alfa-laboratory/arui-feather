/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-console: 0 */

/**
 * Throws error on react warnings.
 * Used only in tests.
 *
 * @param {String} message Message
 */
console.error = function (message) {
    throw new Error(message);
};
