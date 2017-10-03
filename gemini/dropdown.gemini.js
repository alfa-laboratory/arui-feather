import Dropdown from '../src/dropdown';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Label from '../src/label';

const NAME = 'dropdown';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        disabled: true,
        switcherContent: 'Disabled switcher'
    },
    {
        popupContent: <Label size='m'>Label inside dropdown popup</Label>,
        popupProps: {
            directions: ['bottom-left'],
            mainOffset: 13,
            type: 'tooltip'
        }
    },
    {
        disabled: true,
        switcherContent: 'Disabled switcher',
        switcherType: 'button'
    },
    {
        switcherType: 'button',
        popupContent: 'Dropdown popup',
        popupProps: {
            directions: ['right-center'],
            mainOffset: 13,
            type: 'tooltip'
        }
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
                    let props = { theme, size, opened: !set.disabled, ...set };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <Dropdown { ...props } />
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
