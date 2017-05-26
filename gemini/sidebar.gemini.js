import Heading from '../src/heading';
import Paragraph from '../src/paragraph';
import Sidebar from '../src/sidebar';
import { LOREM_IPSUM } from '../src/vars';

const NAME = 'sidebar';
const THEMES = ['alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme, visible: true };
            let template = (
                <div>
                    <Sidebar { ...props }>
                        <Heading size='l'>
                            Sidebar Title
                        </Heading>
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 1) }
                        </Paragraph>
                    </Sidebar>
                </div>
            );

            suite
                .setExtraCaptureElements(['body'])
                .render(template)
                .capture('plain');
        });
    });
});
