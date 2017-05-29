import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import User from '../src/user';

const NAME = 'user';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, (suite) => {
            let props = { theme, text: 'Client', url: '#' };
            let template = (
                <GeminiBox theme={ theme }>
                    <User { ...props } />
                </GeminiBox>
            );

            suite
                .render(template)
                .capture('plain')
                .capture('hovered', function (actions) {
                    actions.mouseMove(this.renderedComponent);
                });
        });
    });
});
