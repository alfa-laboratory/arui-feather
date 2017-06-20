module.exports = {
    extends: require.resolve('arui-presets/eslint'),
    rules: {
        'func-names': 0,
        'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx'] }],
        'react/jsx-filename-extension': 0,
        'react/jsx-no-undef': 0,
        'chai-friendly/no-unused-expressions': 0,
        'react/jsx-indent': 0,
        'semi': 0,
        'react/prop-types': 0
    },
    plugins: [
        'markdown'
    ],
    globals : {
        "state": true,
        "initialState": true,
        "setState": true
    }
};
