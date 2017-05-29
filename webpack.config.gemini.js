/* eslint strict: [0, "global"] */

'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

module.exports = merge.smart(ARUI_TEMPLATE, {
    devtool: 'eval',
    module: {
        loaders: [
            // TODO @akitov: temporary fix, I'm not sure which module isn't compile
            {
                test: /\.jsx?$/,
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
