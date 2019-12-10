import Collapse from '../src/collapse';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Paragraph from '../src/paragraph';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'collapse';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

const PROP_SETS = [
    {
        collapsedLabel: 'Подробнее',
        expandedLabel: 'Скрыть'
    },
    {
        collapsedLabel: 'Подробнее',
        expandedLabel: 'Скрыть',
        isExpanded: true
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
                        <Collapse { ...props }>
                            <Paragraph>
                                { LOREM_IPSUM.slice(0, 3) }
                            </Paragraph>
                        </Collapse>
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
