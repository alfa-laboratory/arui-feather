module.exports = {
    extends: require.resolve('arui-presets/eslint'),
    rules: {
        'func-names': 0,
        'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx'] }]
    }
};
