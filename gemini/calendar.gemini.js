import startOfDay from 'date-fns/start_of_day';
import addDays from 'date-fns/add_days';
import subtractDays from 'date-fns/sub_days';
import getTime from 'date-fns/get_time';

import Calendar from '../src/calendar';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const DATE = startOfDay(new Date('2017-04-12'));

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
        offDays: [
            getTime(startOfDay(addDays(DATE, 1))),
            getTime(startOfDay(addDays(DATE, 4))),
            getTime(startOfDay(addDays(DATE, 7)))
        ]
    },
    {
        value: DATE.valueOf(),
        eventDays: [
            getTime(startOfDay(addDays(DATE, 1))),
            getTime(startOfDay(addDays(DATE, 4))),
            getTime(startOfDay(addDays(DATE, 7)))
        ]
    }
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            const selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;
            const props = { theme, ...set };

            geminiReact.suite(selector, (suite) => {
                suite
                    .render(
                        <GeminiBox theme={ theme }>
                            <Calendar { ...props } />
                        </GeminiBox>
                    )
                    .capture('plain')
                    .capture('hovered', (actions) => {
                        actions.mouseMove('.calendar__arrow.calendar__arrow_direction_right');
                    })
                    .capture('selectMonths', (actions) => {
                        actions.click('.calendar__name.calendar__name_month');
                    })
                    .capture('selectYear', (actions) => {
                        actions.click('.calendar__name.calendar__name_year');
                    });
            });
        });
    });
});
