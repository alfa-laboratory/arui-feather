import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Textarea from '../src/textarea';

const NAME = 'textarea';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

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
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    let props = { theme, size, ...set };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <Textarea { ...props } />
                        </GeminiBox>
                    );

                    if (set.template) {
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
                            .capture('focused', function (actions) {
                                actions.mouseUp(this.renderedComponent);
                            });
                    }
                });
            });
        });
    });
});
