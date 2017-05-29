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

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let template = (
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
