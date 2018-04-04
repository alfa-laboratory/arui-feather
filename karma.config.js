/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint strict: [0, "global"] */

'use strict';

const merge = require('webpack-merge');
const WEBPACK_BASE_TEMPLATE = require('arui-presets/webpack.base');
const WEBPACK_DEV_TEMPLATE = require('arui-presets/webpack.development');

const IS_MOBILE = !!process.env.MOBILE;

function getTestsGlobs(tests, postfix) {
    return tests.split(',').map(testName => `./src/${testName}/*-${postfix}.{js,jsx}`);
}

let babelLoaderConfig = WEBPACK_BASE_TEMPLATE.module.rules.find(l => /babel-loader/.test(l.loader));
delete babelLoaderConfig.exclude;

module.exports = (config) => {
    let cfg = {
        singleRun: true,
        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader'),
            require('karma-coverage-istanbul-reporter')
        ],
        webpack: merge.smart(WEBPACK_BASE_TEMPLATE, WEBPACK_DEV_TEMPLATE, {
            devtool: 'inline-source-map'
        }),
        webpackMiddleware: {
            noInfo: true,
            quiet: true
        }
    };

    cfg.webpack.module.rules.push({
        test: /\.jsx?$/,
        use: {
            loader: 'istanbul-instrumenter-loader',
            options: { esModules: true }
        },
        enforce: 'post',
        exclude: [
            /node_modules/,
            /-test\.jsx?$/,
            /(cn|modernizr|polyfills|test-utils|vars)\.js$/,
            /(countries|currency-codes|easings|keyboard-code)\.js$/
        ]
    });

    let testsFiles = !process.env.TESTS
        ? ['./src/**/*-test.js?(x)']
        : getTestsGlobs(process.env.TESTS, 'test');

    testsFiles.unshift('./src/polyfills.js');
    testsFiles.unshift('./tools/karma-warnings.js');

    Object.assign(cfg, {
        frameworks: ['mocha', 'chai-dom', 'chai', 'sinon-chai'],
        reporters: ['mocha', 'coverage-istanbul'],
        preprocessors: {
            './src/**/*': ['webpack', 'sourcemap']
        },
        files: testsFiles,
        coverageIstanbulReporter: {
            reports: ['lcov', 'text'],
            fixWebpackSourcePaths: true
        },
        captureConsole: true,
        coverageReporter: {
            check: {
                global: {
                    statements: 86,
                    branches: 80,
                    functions: 95,
                    lines: 40
                }
            }
        },
        logLevel: cfg.LOG_DEBUG
    });

    cfg.plugins.push(
        require('karma-mocha'),
        require('karma-chai'),
        require('karma-chai-dom'),
        require('karma-mocha-reporter'),
        require('karma-coverage'),
        require('karma-sinon-chai')
    );

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

    config.set(cfg);
};
