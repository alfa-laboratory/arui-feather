module.exports = {
    extends: require.resolve('arui-presets-lint/eslint'),

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

        // temporary fix: https://github.com/babel/babel-eslint/issues/681
        "template-curly-spacing" : 'off',
        'indent' : 'off',

        // TODO: enable this rules in future
        'react/jsx-props-no-spreading': 'off', // TODO: replace to on
        'react/destructuring-assignment': 'off', // TODO: replace to always
        'react/state-in-constructor': 'off', // TODO: replace to on
        'react/button-has-type': 'off', // TODO: replace to on
        'react/no-access-state-in-setstate': 'off', // TODO: replace to on
        'react/static-property-placement': 'off',
        'import/no-useless-path-segments': 'off', //TODO: replace to on
        'jsx-a11y/control-has-associated-label': 'off', //TODO: replace to on
        'lines-between-class-members': 'off', //TODO: replace to on
        'max-classes-per-file': 'off' //TODO: replace to on
    }
};
