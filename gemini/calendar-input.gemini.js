import CalendarInput from '../src/calendar-input';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const DATE = '28.09.2016';

const NAME = 'calendar-input';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        value: DATE
    },
    {
        value: DATE,
        width: 'available'
    },
    {
        value: DATE,
        error: 'Something went wrong'
    },
    {
        value: DATE,
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
                let props = { theme, ...set };
                let template = (
                    <GeminiBox theme={ theme } width={ set.width }>
                        <CalendarInput { ...props } />
                    </GeminiBox>
                );

                geminiReact.suite(selector, function (suite) {
                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .setExtraCaptureElements(['.popup'])
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('focused', function (actions, find) {
                                actions.focus(find('.input__control'));
                            });
                    }
                });
            });
        });
    });
});
