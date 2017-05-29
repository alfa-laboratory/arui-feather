import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Message from '../src/message';
import ThemeProvider from '../src/theme-provider';

const NAME = 'message';
const THEMES = ['alfa-on-white', 'alfa-on-color'];

const PROP_SETS = [
    { visible: true },
    { visible: true, type: 'popup' }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        PROP_SETS.forEach((set, index) => {
            let selector = `${themeSelector}.${NAME}_prop-set_${index + 1}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, ...set };
                let template = (
                    set.type === 'popup' ? (
                        <ThemeProvider theme={ theme }>
                            <Message { ...props }>
                                Some message
                            </Message>
                        </ThemeProvider>
                    ) : (
                        <GeminiBox theme={ theme }>
                            <Message { ...props }>
                                Some message
                            </Message>
                        </GeminiBox>
                    )
                );

                suite
                    .setExtraCaptureElements(set.type === 'popup' ? ['.popup'] : [])
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
