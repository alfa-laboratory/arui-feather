/* eslint import/no-extraneous-dependencies: 0 */
/* eslint strict: [0, "global"] */

'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const WEBPACK_BASE_TEMPLATE = require('../webpack.base');

module.exports = merge.smart(WEBPACK_BASE_TEMPLATE, {
    module: {
        rules: [
            // We need to transpile at least `gemini-react/lib/client-wrapper.js` for IE10
            {
                test: /gemini-react\/lib\/client-wrapper\.js$/,
                exclude: /node_modules\/(?!gemini-react\/).*/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin([
            'ALL_SIZES'
        ])
    ]
});
