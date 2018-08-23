module.exports = {
    extends: require.resolve('arui-presets/eslint'),
    rules: {
        'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx'] }]
    },
    overrides: [
        {
            files: ['src/**/*.test.{js,jsx}', 'src/**/__mocks__/*.{js,jsx}'],
            globals: {
                jest: true,
                beforeAll: true,
                afterAll: true
            }
        },
        {
            files: ['src/**/*-test.{js,jsx}'],
            globals: {
                sinon: true
            }
        }
    ]
};
