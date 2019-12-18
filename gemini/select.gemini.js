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
    { options: OPTIONS, disabled: true },
    { options: OPTIONS },
    { options: OPTIONS, width: 'available' },
    { options: OPTIONS, label: 'test-label' },
    { options: OPTIONS, placeholder: 'test-placeholder' },
    { options: OPTIONS, label: 'test-label', placeholder: 'test-placeholder' },
    {
        options: OPTIONS,
        value: [1],
        label: 'test-label',
        placeholder: 'test-placeholder'
    },
    { options: OPTIONS, label: 'test-label', opened: true },
    { options: OPTIONS, placeholder: 'test-placeholder', opened: true },
    {
        options: OPTIONS,
        label: 'test-label',
        placeholder: 'test-placeholder',
        opened: true
    },
    {
        options: OPTIONS,
        value: [1],
        label: 'test-label',
        placeholder: 'test-placeholder',
        opened: true
    },
    {
        options: OPTIONS,
        width: 'available',
        error: 'Произошла ошибка, попробуйте сделать запрос ещё раз'
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
                    const props = { theme, size, ...set };
                    const template = (
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
