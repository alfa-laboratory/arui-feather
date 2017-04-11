import Copyright from '../src/copyright/copyright';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'copyright';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme };
            let template = (
                <GeminiBox theme={ theme }>
                    <Copyright { ...props } />
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
