/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const buildConfig = require('./karma.config-builder');

const { SUITES } = process.env;

function getTestFiles(tests, postfix) {
    return tests.split(',').map(testName => `./src/${testName}/*-${postfix}.{js,jsx}`);
}

module.exports = (baseConfig) => {
    const config = buildConfig({
        frameworks: ['mocha', 'chai', 'chai-dom', 'sinon-chai'],
        reporters: ['mocha', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['lcov', 'text'],
            fixWebpackSourcePaths: true
        },
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
        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-chai-dom'),
            require('karma-sinon-chai'),
            require('karma-coverage'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-mocha-reporter')
        ],
        files: SUITES ? getTestFiles(SUITES, 'test') : ['./src/**/*-test.js?(x)'],
        webpack: {
            module: {
                rules: [
                    {
                        test: /\.jsx?$/,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: { esModules: true }
                        },
                        enforce: 'post',
                        exclude: [
                            /node_modules/,
                            /-test\.jsx?$/,
                            /(cn|modernizr|polyfills|-utils|vars)\.js$/,
                            /(countries|currency-codes|easings|keyboard-code)\.js$/
                        ]
                    }
                ]
            }
        }
    });

    baseConfig.set(config);
};
