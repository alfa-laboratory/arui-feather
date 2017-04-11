import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Support from '../src/support/support';

const NAME = 'support';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let selector = `${NAME}_theme_${theme}`;

        geminiReact.suite(selector, function (suite) {
            let props = { theme, city: 'City', phone: '+7 123 123 12 31' };
            let template = (
                <GeminiBox theme={ theme }>
                    <Support { ...props } />
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
