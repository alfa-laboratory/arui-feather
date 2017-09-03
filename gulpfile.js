/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const createTasks = require('library-utils/gulp-tasks');

createTasks('arui-feather', {
    componentsGlob: [
        'src/*/*.jsx',
        '!src/*/*-test.jsx',
        '!src/*/*-benchmark.jsx'
    ]
});
