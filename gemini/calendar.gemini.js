import startOfDay from 'date-fns/start_of_day';
import addDays from 'date-fns/add_days';
import subtractDays from 'date-fns/sub_days';

import Calendar from '../src/calendar';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const DATE = startOfDay(new Date('2016-09-23'));

const NAME = 'calendar';
const THEMES = ['alfa-on-color', 'alfa-on-white'];

const PROP_SETS = [
    {
        value: DATE.valueOf()
    },
    {
        value: DATE.valueOf(),
        earlierLimit: subtractDays(DATE, 3).valueOf(),
        laterLimit: subtractDays(DATE, 1).valueOf()
    },
    {
        value: DATE.valueOf(),
        offDays: [subtractDays(DATE, 2).valueOf(), addDays(DATE, 2).valueOf()]
    }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;
            let props = { theme, ...set };

            geminiReact.suite(selector, function (suite) {
                suite
                    .render(
                        <GeminiBox theme={ theme }>
                            <Calendar { ...props } />
                        </GeminiBox>
                    )
                    .capture('plain')
                    .capture('hovered', function (actions) {
                        actions.mouseMove('.calendar__arrow.calendar__arrow_direction_right');
                    });
            });
        });
    });
});
