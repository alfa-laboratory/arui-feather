import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import ProgressBar from '../src/progress-bar';

const NAME = 'progress-bar';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, (suite) => {
            const template = (
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
