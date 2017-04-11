global.React = require('react');

module.exports = {
    gridUrl: 'http://localhost:8887',
    rootUrl: 'http://localhost:8888',
    windowSize: '1024x768',

    httpTimeout: 60000,
    retry: 2,
    sessionsPerBrowser: 3,
    suitesPerSession: 100,

    browsers: {
        PhantomJS: {
            desiredCapabilities: {
                browserName: 'phantomjs'
            }
        }
    },

    system: {
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
                    './gemini-utils/polyfills.js',
                    './gemini-utils/gemini-main.css',
                    './src/main.css'
                ],
                port: 8888,
                staticRoot: './',
                webpackConfig: './webpack.config.gemini.js'
            }
        },
        tempDir: './'
    }
};
