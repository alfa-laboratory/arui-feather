import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Textarea from '../src/textarea';

const NAME = 'textarea';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];
const TEXT = 'Far far away, behind the word mountains, there live the blind texts. ';

const PROP_SETS = [
    {},
    {
        placeholder: 'Textarea'
    },
    {
        placeholder: 'Textarea',
        error: 'Something went wrong'
    },
    {
        placeholder: 'Textarea',
        disabled: true
    },
    {
        label: 'Comment',
        maxRows: 7
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
                            <Textarea { ...props } />
                        </GeminiBox>
                    );

                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else if (set.label) {
                        suite
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('focused', function (actions) {
                                actions.mouseUp(this.renderedComponent);
                            })
                            .capture('with-text', (actions, find) => {
                                actions.sendKeys(find('.textarea_has-label .textarea__control'), TEXT.repeat(3));
                            });
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
                            .capture('focused', function (actions) {
                                actions.mouseUp(this.renderedComponent);
                            });
                    }
                });
            });
        });
    });
});
