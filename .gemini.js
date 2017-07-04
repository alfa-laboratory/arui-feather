global.React = require('react');

module.exports = {
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
                version: '57',
                platform: 'Windows 7'
            }
        }
    },

    system: {
        debug: false,
        exclude: [
            '*demo/',
            'docs/',
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
                jsModules: [
                    './gemini-utils/gemini-main.css'
                ],
                port: 8668,
                staticRoot: './',
                webpackConfig: './webpack.config.gemini.js'
            },
            'saucelabs-info': {}
        },
        projectRoot: './',
        tempDir: './'
    }
};
