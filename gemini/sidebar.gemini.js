import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Heading from '../src/heading/heading';
import Paragraph from '../src/paragraph/paragraph';
import Sidebar from '../src/sidebar/sidebar';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'sidebar';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme, visible: true };
            let template = (
                <GeminiBox theme={ theme }>
                    <Sidebar { ...props }>
                        <Heading size='l'>
                            Sidebar Title
                        </Heading>
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </Sidebar>
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
