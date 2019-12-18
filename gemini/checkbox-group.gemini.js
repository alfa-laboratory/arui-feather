import Checkbox from '../src/checkbox';
import CheckboxGroup from '../src/checkbox-group';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'checkbox-group';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    { type: 'button' },
    { type: 'line' },
    { disabled: true }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                const props = { theme, size, ...set };
                const checkboxProps = {
                    type: set.type === 'button' ? 'button' : 'normal',
                    text: 'Checkbox'
                };
                const template = (
                    <GeminiBox theme={ theme }>
                        <CheckboxGroup { ...props }>
                            <Checkbox { ...checkboxProps } />
                            <Checkbox { ...checkboxProps } />
                            <Checkbox { ...checkboxProps } />
                        </CheckboxGroup>
                    </GeminiBox>
                );

                // У обычного checkbox нет размеров s и xl
                if (set.type !== 'button' && (size === 's' || size === 'xl')) {
                    return;
                }

                geminiReact.suite(selector, (suite) => {
                    suite
                        .render(template)
                        .capture('plain');
                });
            });
        });
    });
});
