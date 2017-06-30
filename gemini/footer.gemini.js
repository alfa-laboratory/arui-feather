import Footer from '../src/footer';
import GeminiBox from '../gemini-utils/gemini-box/gemini-box';

const NAME = 'footer';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme };
            let template = (
                <GeminiBox theme={ theme } width='available'>
                    <Footer { ...props } />
                </GeminiBox>
            );

            suite
                .before(function (actions) {
                    actions.executeJS(function () {
                        document.body.firstElementChild.id = 'react-app';
                    });
                })
                .render(template)
                .capture('plain');
        });
    });
});
