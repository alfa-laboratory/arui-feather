import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import SlideDown from '../src/slide-down/slide-down';
import Paragraph from '../src/paragraph/paragraph';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'slide-down';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const PROP_SETS = [
    { isExpanded: true },
    { isExpanded: false }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        PROP_SETS.forEach((set, index) => {
            let selector = `${NAME}_theme_${theme}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let template = (
                    <GeminiBox theme={ theme }>
                        <SlideDown { ...props }>
                            <Paragraph>
                                { LOREM_IPSUM.slice(0, 3) }
                            </Paragraph>
                        </SlideDown>
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
