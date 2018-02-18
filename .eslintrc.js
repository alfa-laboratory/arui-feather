module.exports = {
    extends: require.resolve('arui-presets/eslint'),
    rules: {
        'react/jsx-filename-extension': [2, { 'extensions': ['gemini.js', '.jsx'] }],
        'no-mixed-operators': 0
    },
    globals: {
        sinon: true
    }
};
