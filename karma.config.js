/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint strict: [0, "global"] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const IS_MOBILE = !!process.env.MOBILE;

function getTestsGlobs(tests, postfix) {
    return tests.split(',').map(function (testName) {
        return `./src/${testName}/*-${postfix}.{js,jsx}`;
    });
}

let babelLoaderConfig = ARUI_TEMPLATE.module.loaders.find(l => l.loader === 'babel-loader');
delete babelLoaderConfig.exclude;

module.exports = function (config) {
    const cfg = {
        browsers: ['PhantomJS_Desktop'],

        singleRun: true,

        plugins: [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-phantomjs-launcher'),
            require('karma-sourcemap-loader')
        ],

        webpack: merge.smart(ARUI_TEMPLATE, {
            devtool: 'inline-source-map'
        }),

        webpackMiddleware: {
            noInfo: true,
            quiet: true
        },

        customLaunchers: {
            PhantomJS_Desktop: {
                base: 'PhantomJS',
                options: {
                    viewportSize: {
                        width: 1280,
                        height: 100
                    }
                }
            }
        },

        browserNoActivityTimeout: 20000
    };

    if (IS_MOBILE) {
        cfg.browsers = ['MobileSafari'];
        cfg.plugins.push(
            require('karma-ios-simulator-launcher')
        );
    }

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

    const testsFiles = !process.env.TESTS
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
        }
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

    config.set(cfg);
};
