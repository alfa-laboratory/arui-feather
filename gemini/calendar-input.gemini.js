import CalendarInput from '../src/calendar-input';
import IconOk from '../src/icon/ui/ok';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const DATE = '12.04.2017';

const NAME = 'calendar-input';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

function renderAddons(calendarInputSize) {
    let iconSize;

    switch (calendarInputSize) {
        case 's':
        case 'm': iconSize = 's'; break;
        case 'l': iconSize = 'm'; break;
        case 'xl': iconSize = 'l'; break;
    }

    return (
        <IconOk size={ iconSize } colored={ true } />
    );
}

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
    },
    {
        value: '',
        defaultMonth: '01.09.2018'
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;
                const props = {
                    theme,
                    leftAddons: index === 4 && renderAddons(size),
                    rightAddons: index === 4 && renderAddons(size),
                    ...set
                };
                const template = (
                    <GeminiBox theme={ theme } width={ set.width }>
                        <CalendarInput { ...props } />
                    </GeminiBox>
                );

                geminiReact.suite(selector, (suite) => {
                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .setExtraCaptureElements(['.popup'])
                            .render(template)
                            .capture('plain')
                            .capture('focused', (actions, find) => {
                                actions.focus(find('.input__control'));
                            });
                    }
                });
            });
        });
    });
});
