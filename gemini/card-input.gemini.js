import CardInput from '../src/card-input/card-input';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'card-input';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    { disabled: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                let props = { theme, size, ...set };
                let template = (
                    <GeminiBox theme={ theme }>
                        <CardInput { ...props } />
                    </GeminiBox>
                );

                geminiReact.suite(selector, function (suite) {
                    suite
                        .render(template)
                        .capture('plain');
                });
            });
        });
    });
});
