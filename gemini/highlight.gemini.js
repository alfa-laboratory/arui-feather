import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Hightlight from '../src/highlight';

const NAME = 'highlight';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme };
            let template = (
                <GeminiBox theme={ theme }>
                    <Hightlight { ...props }>
                        Notice me
                    </Hightlight>
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
