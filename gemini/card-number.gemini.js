import CardNumber from '../src/card-number/card-number';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'card-number';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme, value: '1234*********9321' };
            let template = (
                <GeminiBox theme={ theme }>
                    <CardNumber { ...props } />
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
