import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Radio from '../src/radio';
import RadioGroup from '../src/radio-group';

const NAME = 'radio-group';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    { type: 'button' },
    { error: true },
    { type: 'button', error: true },
    { disabled: true },
    { type: 'button', disabled: true }
];

const RADIOS = [
    { text: 'One', value: 'radio-1-1' },
    { text: 'Two', value: 'radio-1-2' },
    { text: 'Three', value: 'radio-1-3' },
    { text: 'Four', value: 'radio-1-4' }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                // У обычного radio нет размеров s и xl
                if (set.type !== 'button' && (size === 's' || size === 'xl')) {
                    return;
                }

                geminiReact.suite(selector, (suite) => {
                    const props = { theme, size, ...set };
                    const template = (
                        <GeminiBox theme={ theme }>
                            <RadioGroup type={ set.type === 'button' ? 'button' : 'normal' }>
                                {
                                    RADIOS.map(radio => (
                                        <Radio
                                            text={ radio.text }
                                            key={ radio.value }
                                            value={ radio.value }
                                            { ...props }
                                        />
                                    ))
                                }
                            </RadioGroup>
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
