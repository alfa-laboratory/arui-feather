import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import ListHeader from '../src/list-header';

const NAME = 'list-header';
const THEMES = ['alfa-on-color', 'alfa-on-white'];

const PROP_SETS = [
    {
        title: '26 мая 2017',
        description: 'пятница',
        view: 'filled'
    },
    {
        title: 'Сегодня',
        view: 'transparent'
    }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let template = (
                    <GeminiBox theme={ theme }>
                        <ListHeader { ...props } />
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
