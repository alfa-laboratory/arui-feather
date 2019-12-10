module.exports = {
    extends: require.resolve('arui-presets-lint/eslint'),
    rules: {
        'func-names': 0,
        'max-len': 0,
        'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx', '.md'] }],
        'react/jsx-no-undef': 0,
        'chai-friendly/no-unused-expressions': 0,
        'react/jsx-indent': 0,
        'semi': 0,
        'react/prop-types': 0,
        // in readme we import 'arui-feather/bla', which always be unresolved inside arui-feather
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': 0,
        'import/extensions': 0
    },
    plugins: [
        'markdown'
    ],
    globals : {
        state: true,
        initialState: true,
        setState: true
    }
};
