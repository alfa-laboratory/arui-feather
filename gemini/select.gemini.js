import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Select from '../src/select';

const NAME = 'select';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const OPTIONS = [
    {
        value: 1,
        text: 'Orange'
    },
    {
        value: 2,
        text: 'Banana'
    },
    {
        value: 3,
        text: 'Apple'
    }
];

const PROP_SETS = [
    { options: OPTIONS, opened: true, mode: 'check' },
    { options: OPTIONS, opened: true, mode: 'radio' },
    { options: OPTIONS, opened: true, mode: 'radio-check' },
    { options: OPTIONS, disabled: true }
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
                            <Select
                                { ...props }
                            />
                        </GeminiBox>
                    );

                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .setExtraCaptureElements(['.popup'])
                            .render(template)
                            .capture('plain');
                    }
                });
            });
        });
    });
});
