import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Heading from '../src/heading';

const NAME = 'heading';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;
            let selector = `${themeSelector}.${sizeSelector}`;

            geminiReact.suite(selector, function (suite) {
                let props = { theme, size };
                let template = (
                    <GeminiBox theme={ theme }>
                        <Heading { ...props }>
                            Heading Size { size.toUpperCase() }
                        </Heading>
                    </GeminiBox>
                );

                suite
                    .render(template)
                    .capture('plain');
            });
        });
    });
});
