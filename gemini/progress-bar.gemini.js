import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import ProgressBar from '../src/progress-bar';

const NAME = 'progress-bar';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let template = (
                <GeminiBox theme={ theme }>
                    <ProgressBar percent={ 50 } />
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain');
        });
    });
});
