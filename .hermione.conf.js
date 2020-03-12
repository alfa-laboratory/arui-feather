module.exports = {
    baseUrl: 'http://localhost:8668',
    sets: {
        desktop: {
            files: 'hermione/tests'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins: {
            'gemini-babel7': true,
            'hermione-react': {
                port: 8668,
                preparedTestsDir: './prepared-tests',
                webpackConfig: './hermione/webpack.hermione.config.js'
            }
        },

    system: {
        debug: false,
        tempDir: './hermione/',
        ctx: {
            projectRoot: './'
        }
    }
};
