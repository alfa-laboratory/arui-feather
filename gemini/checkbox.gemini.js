import Checkbox from '../src/checkbox';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'checkbox';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    { text: 'Checkbox' },
    { text: 'Checkbox', type: 'button' },
    { text: 'Checkbox', error: true },
    { text: 'Checkbox', type: 'button', error: true },
    { text: 'Checkbox', disabled: true }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                const props = { theme, size, ...set };
                const template = (
                    <GeminiBox theme={ theme }>
                        <Checkbox
                            { ...props }
                        />
                    </GeminiBox>
                );

                // У обычного checkbox нет размеров s и xl
                if (set.type !== 'button' && (size === 's' || size === 'xl')) {
                    return;
                }

                geminiReact.suite(selector, (suite) => {
                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('focused', (actions, find) => {
                                actions.focus(find('.checkbox__control'));
                            });
                    }
                });
            });
        });
    });
});
