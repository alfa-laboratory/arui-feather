/* eslint strict: [0, "global"] */

'use strict';

const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'polyfills.js'),
    output: {
        path: path.resolve(__dirname, 'gemini-utils'),
        filename: 'polyfills.js'
    }
};
