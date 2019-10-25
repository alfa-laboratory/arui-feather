module.exports = {
    extends: require.resolve('arui-presets/eslint'),

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
    ],

    // If you want to change/disable some rule below, write a detailed
    // explanation of the reason
    rules: {
        // List of file extensions with jsx support
        'react/jsx-filename-extension': [2, { extensions: ['gemini.js', '.jsx'] }],

        'react/destructuring-assignment': 'off',
        'react/no-access-state-in-setstate': 'off',

        // Setting the max length of the code
        'max-len': ['error', 120],

        // The validation of jsdoc was disabled due to an unnecessary
        // restriction of writing comments that scares off write developers to
        // write descriptions
        'valid-jsdoc': 'off',
        'jsdoc/newline-after-description': 'off',

        // TODO: Make normal sorting—arrow methods (private) of components can
        // be located after "render" method
        'sort-class-members/sort-class-members': 'off',

        // Destructuring is a syntactic possibility, not a necessity
        'prefer-destructuring': 'off',

        // Default exports are evil 👿
        'import/prefer-default-export': 'off',

        'no-negated-condition': 'off',
        'class-methods-use-this': 'off',
        'import/no-useless-path-segments': 'off'
    }
};
