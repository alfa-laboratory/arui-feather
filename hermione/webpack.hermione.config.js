/* eslint import/no-extraneous-dependencies: 0 */
/* eslint strict: [0, "global"] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const WEBPACK_BASE_TEMPLATE = require('../webpack.base');

module.exports = merge.smart(WEBPACK_BASE_TEMPLATE, {
    mode: 'development',
    stats: 'verbose',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
    }
});
