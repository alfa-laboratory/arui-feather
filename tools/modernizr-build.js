/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint no-console: 0 */
const fs = require('fs');
const modernizr = require('modernizr');
const path = require('path');

const srcPath = path.resolve(__dirname, '../src');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '.modernizrrc')));

function wrapOutput(output) {
    return `
;(function(window) {
if (window) {
  ${output}
  module.exports = window.Modernizr;
} else {
  module.exports = {};
}
})(typeof window !== 'undefined' ? window : false);`;
}

modernizr.build(config, function (output) {
    const filePath = path.join(srcPath, 'modernizr.js');
    const features = output.split('\n')[1];

    fs.readFile(filePath, 'utf-8', function (error, data) {
        if (error && error.code !== 'ENOENT') {
            throw error;
        }

        if (!data || features !== data.split('\n')[4]) {
            fs.writeFile(filePath, wrapOutput(output), function () {
                console.log(`Modernizr build saved at \`${filePath}\``);
            });
        }
    });
});
