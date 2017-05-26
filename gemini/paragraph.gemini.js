import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Paragraph from '../src/paragraph';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'paragraph';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

const PROP_SETS = [
    {},
    {
        view: 'lead',
        mark: 'Ex'
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
                        <Paragraph { ...props }>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
