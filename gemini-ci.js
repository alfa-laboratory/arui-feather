/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint no-confusing-arrow: 0 */
/* eslint strict: [0, "global"] */

'use strict';

const Gemini = require('gemini/api');
const Events = require('gemini/lib/constants/events');
const handleErrors = require('gemini/lib/cli/errors').handleErrors;
const checkForDeprecations = require('gemini/lib/cli/deprecations').checkForDeprecations;
const handleUncaughtExceptions = require('gemini/lib/cli/errors').handleUncaughtExceptions;

function exit(code) {
    process.exit(code);
}

function promiseTry(func) {
    return new Promise(resolve => resolve(func()));
}

function runGemini(paths = []) {
    handleUncaughtExceptions();

    return promiseTry(() => {
        checkForDeprecations();

        const gemini = new Gemini();

        gemini.on(Events.INTERRUPT, (data) => {
            exit(data.exitCode);
        });

        return gemini;
    })
        .then(gemini => gemini.test(paths, { reporters: [{ name: 'flat' }] }))
        .then(stats => stats.failed > 0 ? 2 : 0)
        .catch(handleErrors)
        .then(exit);
}

runGemini();
