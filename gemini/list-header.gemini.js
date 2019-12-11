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

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            const selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, (suite) => {
                const props = { theme, ...set };
                const template = (
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
