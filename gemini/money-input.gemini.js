import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import MoneyInput from '../src/money-input';

const NAME = 'money-input';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        showCurrency: true,
        currencyCode: 'USD',
        bold: true
    }
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
                            <MoneyInput { ...props } value='1 000 000' />
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
