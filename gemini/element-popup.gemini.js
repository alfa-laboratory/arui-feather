import ElementPopup from '../src/element-popup';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'element-popup';
const THEMES = ['alfa-on-color', 'alfa-on-white'];

const TRIGGERS = ['click', 'hover'];

const PROP_SETS = [
    { direction: 'top', subDirection: 'to-left' },
    { direction: 'top', subDirection: 'to-right' },
    { direction: 'bottom', subDirection: 'to-left' },
    { direction: 'bottom', subDirection: 'to-right' },
    { direction: 'right', subDirection: 'to-top' },
    { direction: 'right', subDirection: 'to-bottom' },
    { direction: 'left', subDirection: 'to-top' },
    { direction: 'left', subDirection: 'to-bottom' }
];

const CONST_PROPS = {
    content: (<span>test content</span>),
    forceDirection: true
};

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        TRIGGERS.forEach((trigger, idx) => {
            PROP_SETS
                .map(s => ({ ...s, trigger, ...CONST_PROPS }))
                .forEach((set, index) => {
                    let selector = `${themeSelector}.${NAME}_prop-set_${idx + 1}_${index + 1}`;

                    geminiReact.suite(selector, function (suite) {
                        let props = { theme, ...set };
                        let template = (
                            <GeminiBox theme={ theme }>
                                <ElementPopup { ...props }>
                                    <span>test</span>
                                </ElementPopup>
                            </GeminiBox>
                        );

                        if (set.trigger === 'click') {
                            suite
                                .render(template)
                                .capture('plain')
                                .capture('pressed', function (actions) {
                                    actions.mouseDown(this.renderedComponent);
                                });
                        } else {
                            suite
                                .render(template)
                                .capture('plain')
                                .capture('hovered', function (actions) {
                                    actions.mouseMove(this.renderedComponent);
                                });
                        }
                    });
                });
        });
    });
});
