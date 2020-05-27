module.exports = {
    extends: [
        require.resolve('arui-presets-lint/eslint'),
    ],

    overrides: [
        {
            files: ['src/**/*.tsx'],
            rules: {
                'max-classes-per-file': 'off',
                'no-param-reassign': 'off',
            }
        },
        // Иконки автогенерированы
        {
            files: ['src/icon/**/*.tsx'],
            rules: {
                '@typescript-eslint/no-explicit-any': 'off'
            }
        },
        {
            files: ['src/**/*.test.{tsx,ts}', 'src/**/__mocks__/*.{ts,tsx}'],
            globals: {
                jest: true,
                beforeAll: true,
                afterAll: true
            }
        },
        {
            files: ['gemini/*.gemini.js'],
            globals: {
                geminiReact: true
            },
            rules: {
                // Их нельзя переименовать в jsx
                'react/react-in-jsx-scope': 'off',
                'max-classes-per-file': 'off'
            }
        }
    ],

    // If you want to change/disable some rule below, write a detailed
    // explanation of the reason
    rules: {
        // List of file extensions with jsx support
        'react/jsx-filename-extension': [2, { extensions: ['gemini.js', '.tsx'] }],

        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.tsx", "gulpfile.js"]}],

        // The validation of jsdoc was disabled due to an unnecessary
        // restriction of writing comments that scares off write developers to
        // write descriptions
        'valid-jsdoc': 'off',
        'jsdoc/newline-after-description': 'off',

        // TODO: Make normal sorting—arrow methods (private) of components can
        // be located after "render" method
        'sort-class-members/sort-class-members': 'off',

        // Destructuring is a syntactic possibility, not a necessity
        'prefer-destructuring': 'off'
    }
};
