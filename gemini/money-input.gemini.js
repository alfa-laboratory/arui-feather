import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import MoneyInput from '../src/money-input/money-input';

const NAME = 'money-input';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    { value: '1000000' },
    { value: '1000000', disabled: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, function (suite) {
                    let props = { theme, size, ...set };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <MoneyInput { ...props } />
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
