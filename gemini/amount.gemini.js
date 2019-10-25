import Amount from '../src/amount';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'amount';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const AMOUNT = {
    value: 123535,
    currency: {
        code: 'RUR',
        minority: 100
    }
};

const PROP_SETS = [
    { isHeading: true },
    { isHeading: false }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            PROP_SETS.forEach((isHeadingProp, index) => {
                const sizeSelector = `${NAME}_size_${size}`;
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = {
                        theme,
                        size,
                        amount: AMOUNT,
                        isHeading: isHeadingProp.isHeading
                    };
                    const template = (
                        <GeminiBox theme={ theme }>
                            <Amount { ...props } />
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
