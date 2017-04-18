/* eslint strict: [0, "global"] */

'use strict';

const path = require('path');
/* eslint-disable */
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const config = {
    title: 'ARUI FEATHER',
    template: path.resolve(__dirname, './arui-demo/demo.html'),
    serverPort: 3013,
    components: 'src/+(amount|attach|button|calendar|card-input|card-number|checkbox|checkbox-group|collapse|copyright|dropdown|email-input|form|form-field|highlight|icon|input|label)/**/[a-z]*.jsx',
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './arui-demo/styleguide/'),
    webpackConfig: Object.assign({}, ARUI_TEMPLATE, {
        resolve: {
            alias: {
                // Override styleguidist preview template for adding theme switcher functionality
                'rsg-components/Preview': path.resolve(__dirname, './arui-demo/components/preview.jsx')
            }
        }
    })
};
module.exports = config;
