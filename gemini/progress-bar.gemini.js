import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import ProgressBar from '../src/progress-bar';

const NAME = 'progress-bar';

geminiReact.suite(NAME, function (suite) {
    let progress = 50;
    let template = (
        <GeminiBox theme='alfa-on-white'>
            <ProgressBar percent={ progress } />
        </GeminiBox>
    );

    suite
        .render(template)
        .capture('plain');
});
