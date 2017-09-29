import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import List from '../src/list';

const NAME = 'list';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const ITEMS = [
    {
        key: 'one',
        value: 'One'
    },
    {
        key: 'two',
        value: 'Two'
    },
    {
        key: 'three',
        value: 'Three'
    }
];

const PROP_SETS = [
    { items: ITEMS },
    { items: ITEMS, type: 'ordered' }
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
                            <List { ...props } />
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
