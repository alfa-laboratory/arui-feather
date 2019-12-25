module.exports = {
    extends: 'arui-presets-lint/stylelint',
    plugins: [
        'stylelint-value-no-unknown-custom-properties'
    ],
    rules: {
        'csstools/value-no-unknown-custom-properties': [true, {
            importFrom: [
                'src/vars.css',
                'src/vars/border.css',
                'src/vars/color-theme_alfa-on-color.css',
                'src/vars/color-theme_alfa-on-white.css',
                'src/vars/color.css',
                'src/vars/font.css',
                'src/vars/opacity.css',
                'src/vars/primitive-colors.css',
                'src/vars/shadow.css'
            ]
        }]
    },
    ignoreFiles: 'src/vars/primitive-colors.css'
};
