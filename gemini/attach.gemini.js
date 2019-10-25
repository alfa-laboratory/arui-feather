import Attach from '../src/attach';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'attach';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    {
        value: [{ name: 'Document.pdf' }]
    },
    {
        disabled: true
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                const props = { theme, size, ...set };
                const template = (
                    <GeminiBox theme={ theme }>
                        <Attach { ...props } />
                    </GeminiBox>
                );

                geminiReact.suite(selector, (suite) => {
                    suite
                        .render(template)
                        .capture('plain');
                });
            });
        });
    });
});
