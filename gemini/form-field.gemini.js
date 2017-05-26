import FormField from '../src/form-field';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Input from '../src/input';

const NAME = 'form-field';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    { label: 'Label' },
    { label: 'Label', view: 'line' }
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
                    let boxStyle = set.view === 'line' ? { paddingLeft: 60 } : {};
                    let template = (
                        <GeminiBox style={ boxStyle } theme={ theme }>
                            <FormField { ...props }>
                                <Input placeholder='Input' />
                            </FormField>
                        </GeminiBox>
                    );

                    suite
                        .render(template)
                        .capture('plain', function (actions) {
                            actions.setWindowSize(set.view === 'line' ? 1025 : 1024, 768);
                        });
                });
            });
        });
    });
});
