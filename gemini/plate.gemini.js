import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Link from '../src/link';
import Paragraph from '../src/paragraph';
import Plate from '../src/plate';
import ThemeProvider from '../src/theme-provider';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'plate';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const PROP_SETS = [
    { hasCloser: true },
    { isFlat: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let innerTemplate = (
                    <div>
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                        <Link>Plate Link</Link>
                    </div>
                );

                let template = (
                    <GeminiBox theme={ theme }>
                        <Plate { ...props }>
                            {
                                set.isFlat
                                    ? innerTemplate
                                    : <ThemeProvider theme='alfa-on-white'>{ innerTemplate }</ThemeProvider>
                            }
                        </Plate>
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
