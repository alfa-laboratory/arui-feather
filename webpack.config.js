/* eslint strict: [0, "global"] */

'use strict';

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');
const ARUI_DEV_TEMPLATE = require('arui-presets/webpack.development');
const ARUI_PROD_TEMPLATE = require('arui-presets/webpack.production');

const IS_PRODUCTION = (process.env.NODE_ENV === 'production');
const COMPONENTS_TO_BUILD = process.env.COMPONENTS
    ? process.env.COMPONENTS.toLowerCase().replace(/\s/g, '').split(',')
    : [];
const APP_ROOT = './demo';
const POLYFILLS = './src/polyfills.js';
const TEMPLATE = path.join(
    APP_ROOT,
    IS_PRODUCTION ? 'index-production.html' : 'index-development.html'
);

const DEMO_COMPONENTS = fs.readdirSync(APP_ROOT)
    .filter(item => fs.statSync(path.resolve(APP_ROOT, item)).isDirectory())
    .filter(item => !COMPONENTS_TO_BUILD.length || COMPONENTS_TO_BUILD.find(component => component === item));

// prebuild copy file
if (!fs.existsSync(path.resolve(__dirname, '.build'))) {
    fs.mkdirSync(path.resolve(__dirname, '.build'));
}
if (!fs.existsSync(path.resolve(__dirname, '.build', 'prebuild'))) {
    fs.mkdirSync(path.resolve(__dirname, '.build', 'prebuild'));
}

DEMO_COMPONENTS.forEach((component) => {
    if (!fs.existsSync(path.resolve(__dirname, '.build', 'prebuild', component))) {
        fs.mkdirSync(path.resolve(__dirname, '.build', 'prebuild', component));
    }

    const indexTarget = path.resolve(APP_ROOT, 'index.jsx');
    const indexDestination = path.resolve(__dirname, '.build', 'prebuild', component, 'index.jsx');

    const targetFileData = fs.readFileSync(indexTarget, 'utf8');
    const newDependenciesPath = path.resolve(APP_ROOT, component, 'demo');
    const result = targetFileData.replace(/\.\/demo/g, newDependenciesPath);

    fs.writeFileSync(indexDestination, result, 'utf8');
});

const ENTRIES = Object.assign(
    {
        '.': [
            path.resolve(__dirname, POLYFILLS),
            path.resolve(APP_ROOT, 'index.jsx')
        ]
    },
    DEMO_COMPONENTS.reduce((result, item) => {
        result[item] = [
            path.resolve(__dirname, POLYFILLS),
            path.resolve(__dirname, '.build', 'prebuild', item, 'index.jsx')
        ];
        return result;
    }, {})
);

const webpackConfig = merge.smart(
    ARUI_TEMPLATE,
    {
        entry: ENTRIES,
        output: {
            path: path.resolve(__dirname, '.build', 'dist'),
            publicPath: '../',
            filename: '[name]/index.js'
        },
        plugins: [
            new CopyWebpackPlugin(
                [{ from: TEMPLATE, to: './index.html' }]
                    .concat(DEMO_COMPONENTS.map(component => (
                        { from: TEMPLATE, to: path.resolve(component, './index.html') }
                    )))
            ),
            new webpack.DefinePlugin({
                'process.COMPONENTS': JSON.stringify(DEMO_COMPONENTS.sort()),
                'process.HOT_LOADER': process.env.HOT_LOADER,
                'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: module => /node_modules/.test(module.resource)
            })
        ]
    }
);

module.exports = merge.smart(
    webpackConfig,
    IS_PRODUCTION ? ARUI_PROD_TEMPLATE : ARUI_DEV_TEMPLATE
);
