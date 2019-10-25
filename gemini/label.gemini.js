import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Label from '../src/label';

const NAME = 'label';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl'] : ['m'];

const PROP_SETS = [
    {},
    { isNoWrap: true }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            PROP_SETS.forEach((set, index) => {
                const sizeSelector = `${NAME}_size_${size}`;
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = { theme, size, ...set };
                    const template = (
                        <GeminiBox theme={ theme }>
                            <Label { ...props }>
                                Label
                            </Label>
                        </GeminiBox>
                    );

                    suite
                        .render(template)
                        .capture('plain');
                });
            });
        });
    });
});
