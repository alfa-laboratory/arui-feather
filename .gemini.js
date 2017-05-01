global.React = require('react');

module.exports = {
    gridUrl: 'http://ondemand.saucelabs.com/wd/hub',
    rootUrl: 'http://localhost:8888',
    windowSize: '1024x768',

    httpTimeout: 60000,
    retry: 2,
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
            '.build/',
            'coverage/',
            'demo/',
            'docs/',
            'gemini/screens/',
            'gemini-*/',
            'node_modules/',
            'src/'
        ],
        plugins: {
            babel: true,
            optipng: true,
            react: {
                jsModules: [
                    './gemini-utils/gemini-main.css'
                ],
                port: 8888,
                staticRoot: './',
                webpackConfig: './webpack.config.gemini.js'
            },
            sauce: {}
        },
        tempDir: './'
    }
};
