import Attach from '../src/attach';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Icon from '../src/icon';

const NAME = 'attach';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {},
    {
        buttonContent: 'Please, choose a file',
        noFileText: 'file in pdf format',
        buttonProps: {
            pseudo: true,
            icon: <Icon size='s' icon='search' />
        }
    },
    {
        value: [{ name: 'Document.pdf' }]
    },
    {
        disabled: true
    }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                let props = { theme, size, ...set };
                let template = (
                    <GeminiBox theme={ theme }>
                        <Attach { ...props } />
                    </GeminiBox>
                );

                geminiReact.suite(selector, function (suite) {
                    if (index <= 1) {
                        suite
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('focused', function (actions, find) {
                                actions.focus(find('.attach__control'));
                            });
                    } else {
                        suite
                            .render(template)
                            .capture('plain');
                    }
                });
            });
        });
    });
});
