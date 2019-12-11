import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Input from '../src/input';
import InputGroup from '../src/input-group';

const NAME = 'input-group';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        inputs: [
            { key: 'input-1-1' },
            { key: 'input-1-2' }
        ]
    },
    {
        width: 'available',
        inputs: [
            { key: 'input-2-1' },
            { key: 'input-2-2' },
            { key: 'input-2-3' },
            { key: 'input-2-4' }
        ]
    },
    {
        inputs: [
            { key: 'input-3-1', error: 'Input Error' },
            { key: 'input-3-2', disabled: true },
            { key: 'input-3-3', error: 'Input Error' },
            { key: 'input-3-4', disabled: true }
        ]
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = { theme, size, width: set.width };
                    const template = (
                        <GeminiBox theme={ theme } width={ set.width }>
                            <InputGroup { ...props }>
                                {
                                    set.inputs.map(input => (
                                        <Input
                                            key={ input.key }
                                            placeholder='Input ...'
                                        />
                                    ))
                                }
                            </InputGroup>
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
