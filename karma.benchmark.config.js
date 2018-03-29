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
        frameworks: ['mocha', 'chai'],
        reporters: ['mocha'],
        plugins: [
            require('karma-mocha'),
            require('karma-chai'),
            require('karma-mocha-reporter')
        ],
        files: SUITES ? getTestFiles(SUITES, 'benchmark') : ['./src/**/*-benchmark.js?(x)'],
        proxies: {
            '/stats': 'http://localhost:8186/write'
        }
    });

    baseConfig.set(config);
};
