/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint strict: [0, "global"] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const IS_MOBILE = !!process.env.MOBILE;

function getTestsGlobs(tests, postfix) {
    return tests.split(',').map(testName => `./src/${testName}/*-${postfix}.{js,jsx}`);
}

let babelLoaderConfig = ARUI_TEMPLATE.module.loaders.find(l => l.loader === 'babel-loader');
delete babelLoaderConfig.exclude;

module.exports = (config) => {
    let cfg = {
        singleRun: true,
        plugins: [
            require('karma-webpack'),
            require('karma-sourcemap-loader')
        ],
        webpack: merge.smart(ARUI_TEMPLATE, {
            devtool: 'inline-source-map'
        }),
        webpackMiddleware: {
            noInfo: true,
            quiet: true
        }
    };

    cfg.webpack = merge.strategy({ 'module.loaders': 'append' })(
        cfg.webpack,
        {
            module: { loaders: [
                {
                    test: /\.jsx$/,
                    loader: 'isparta',
                    include: path.resolve('src')
                }
            ] }
        }
    );

    let testsFiles = !process.env.TESTS
        ? ['./src/**/*-test.js?(x)']
        : getTestsGlobs(process.env.TESTS, 'test');

    testsFiles.unshift('./src/polyfills.js');
    testsFiles.unshift('./tools/karma-warnings.js');

    Object.assign(cfg, {
        frameworks: ['mocha', 'chai-spies', 'chai-dom', 'chai'],
        reporters: ['mocha', 'coverage', 'junit'],
        preprocessors: {
            './src/**/*': ['webpack', 'sourcemap']
        },
        files: testsFiles,
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
        junitReporter: {
            outputFile: 'test-results.xml',
            useBrowserName: false
        },
        logLevel: cfg.LOG_DEBUG
    });

    cfg.plugins.push(
        require('karma-mocha'),
        require('karma-chai'),
        require('karma-chai-spies'),
        require('karma-chai-dom'),
        require('karma-mocha-reporter'),
        require('karma-junit-reporter'),
        require('karma-coverage')
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
            }
            // sauceSafariIOS: {
            //     base: 'SauceLabs',
            //     browserName: 'iPhone',
            //     platform: 'OS X 10.12',
            //     version: '10.2',
            //     timeZone: 'Moscow'
            // }
        };

        cfg.browserDisconnectTimeout = 10000;
        cfg.browserDisconnectTolerance = 1;
        cfg.browserNoActivityTimeout = 4 * 60 * 1000;
        cfg.captureTimeout = 4 * 60 * 1000;
        cfg.client = {
            captureConsole: true,
            mocha: {
                timeout: 20000 // override default 2000
            }
        };

        cfg.plugins.push(require('karma-sauce-launcher'));
        cfg.reporters = ['mocha', 'saucelabs'];
        cfg.sauceLabs = { testName: 'ARUI Feather Unit Tests' };
    } else {
        cfg.browserNoActivityTimeout = 20000;
        cfg.customLaunchers = {
            phantomJS: {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 1280,
                        height: 100
                    }
                }
            }
        };
        cfg.plugins.push(require('karma-phantomjs-launcher'));
    }

    cfg.browsers = Object.keys(cfg.customLaunchers);

    config.set(cfg);
};
