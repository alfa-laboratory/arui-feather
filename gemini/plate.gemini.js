import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Paragraph from '../src/paragraph';
import Plate from '../src/plate';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'plate';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const PROP_SETS = [
    { hasCloser: true },
    { foldable: true, title: 'Plate Foldable' },
    { type: 'common', title: 'Plate Common' },
    { type: 'error', title: 'Plate Error' },
    { type: 'success', title: 'Plate Success' }
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
                        <Plate { ...props }>
                            <div>
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                            </div>
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
