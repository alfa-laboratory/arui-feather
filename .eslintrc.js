module.exports = {
    extends: [
        require.resolve('arui-presets-lint/eslint'),
        require.resolve('arui-presets-ts/eslint')
    ],

    overrides: [
        {
            files: ['src/**/*.test.{js,jsx,tsx,ts}', 'src/**/__mocks__/*.{js,jsx}'],
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
        'react/jsx-filename-extension': [2, { extensions: ['gemini.js', '.jsx', '.tsx'] }],

        "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/*.test.tsx", "**/*.test.jsx", "gulpfile.js"]}],

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
