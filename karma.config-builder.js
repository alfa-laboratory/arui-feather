/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint strict: [0, "global"] */

'use strict';

const merge = require('webpack-merge');
const WEBPACK_BASE_TEMPLATE = require('arui-presets/webpack.base');
const WEBPACK_DEV_TEMPLATE = require('arui-presets/webpack.development');

const IS_MOBILE = !!process.env.MOBILE;

let babelLoaderConfig = WEBPACK_BASE_TEMPLATE.module.rules.find(l => /babel-loader/.test(l.loader));
delete babelLoaderConfig.exclude;

module.exports = (options) => {
    let cfg = {
        preprocessors: {
            './src/**/*': ['webpack', 'sourcemap']
        },
        captureConsole: true,
        logLevel: 'WARN',
        singleRun: true,
        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader')
        ],
        files: ['./src/polyfills.js', './tools/karma-warnings.js'],
        webpack: merge.smart(WEBPACK_BASE_TEMPLATE, WEBPACK_DEV_TEMPLATE, {
            devtool: 'inline-source-map'
        }),
        webpackMiddleware: {
            noInfo: true,
            quiet: true
        }
    };

    if (IS_MOBILE) {
        cfg.customLaunchers = {
            sauceChromeAndroid: {
                base: 'SauceLabs',
                browserName: 'Chrome',
                deviceName: 'Android Emulator',
                platformName: 'Android',
                platformVersion: '6.0',
                timeZone: 'Moscow'
            },
            sauceSafariIOS: {
                base: 'SauceLabs',
                browserName: 'iPhone',
                platform: 'OS X 10.12',
                version: '10.3',
                timeZone: 'Moscow'
            }
        };

        cfg.browserDisconnectTimeout = 10000;
        cfg.browserDisconnectTolerance = 1;
        cfg.browserNoActivityTimeout = 4 * 60 * 1000;
        cfg.captureTimeout = 4 * 60 * 1000;
        cfg.client = {
            mocha: {
                timeout: 20000 // override default 2000
            }
        };

        cfg.plugins.push(require('karma-sauce-launcher'));
        cfg.reporters = ['mocha', 'saucelabs'];
        cfg.sauceLabs = { testName: 'ARUI Feather Unit Tests' };
    } else {
        cfg.customLaunchers = {
            CustomChromeHeadless: {
                base: 'ChromeHeadless',
                // For security reasons, Google Chrome is unable to provide sandboxing when it's running in container
                // https://github.com/travis-ci/docs-travis-ci-com/pull/1671
                flags: ['--no-sandbox']
            }
        };
        cfg.plugins.push(require('karma-chrome-launcher'));
    }

    cfg.browsers = Object.keys(cfg.customLaunchers);

    return merge.smart(cfg, options);
};
