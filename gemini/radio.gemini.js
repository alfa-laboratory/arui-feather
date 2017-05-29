import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Radio from '../src/radio/radio';

const NAME = 'radio';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    { text: 'Radio' },
    { text: 'Radio', type: 'button' },
    { text: 'Radio', error: true },
    { text: 'Radio', type: 'button', error: true },
    { text: 'Radio', disabled: true },
    { text: 'Radio', type: 'button', disabled: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                // У обычного radio нет размеров s и xl
                if (set.type !== 'button' && (size === 's' || size === 'xl')) {
                    return;
                }

                geminiReact.suite(selector, function (suite) {
                    let props = { theme, size, ...set };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <Radio
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
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('clicked', function (actions) {
                                actions.mouseUp(this.renderedComponent);
                            })
                            .capture('focused', function (actions, find) {
                                actions.focus(find('.radio__control'));
                            });
                    }
                });
            });
        });
    });
});
