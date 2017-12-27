global.React = require('react');

const fs = require('fs');

const ALL_BROWSERS = !!process.env.ALL_BROWSERS;
const FILE_REGEXP = /\.gemini.\jsx?$/;

let sets = fs.readdirSync('./gemini')
    .filter(item => FILE_REGEXP.test(item))
    .map(item => item.replace(FILE_REGEXP, ''))
    .reduce((result, item) => {
        result[item] = {
            files: [`./gemini/${item}.gemini.js`]
        };
        return result;
    }, {});

let config = {
    gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    rootUrl: 'http://localhost:8668',
    windowSize: '1024x768',

    httpTimeout: 60000,
    retry: 1,
    sessionsPerBrowser: 3,
    suitesPerSession: 150,

    browsers: {
        chromeWin7: {
            desiredCapabilities: {
                browserName: 'chrome',
                version: '60',
                platform: 'Windows 7'
            }
        }
    },

    sets,

    system: {
        debug: false,
        exclude: [
            'demo/',
            'gemini/screens/',
            'gemini-*/',
            'node_modules/',
            'src/'
        ],
        plugins: {
            babel: true,
            'html-reporter': {},
            optipng: true,
            react: {
                jsModules: ['./gemini-utils/gemini-main.css'],
                port: 8668,
                staticRoot: './',
                webpackConfig: './webpack.gemini.config.js'
            },
            'saucelabs-info': {}
        },
        projectRoot: './',
        tempDir: './'
    }
};

if (ALL_BROWSERS) {
    config.system.plugins.react.jsModules.unshift('./src/polyfills.js');

    Object.assign(config.browsers, {
        ie10Win7: {
            desiredCapabilities: {
                browserName: 'internet explorer',
                version: '10',
                platform: 'Windows 7'
            }
        },
        ie11Win81: {
            desiredCapabilities: {
                browserName: 'internet explorer',
                version: '11',
                platform: 'Windows 8.1'
            }
        }
    });
}

module.exports = config;
