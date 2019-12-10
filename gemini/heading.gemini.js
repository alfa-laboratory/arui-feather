import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Heading from '../src/heading';

const NAME = 'heading';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['xs', 's', 'm', 'l', 'xl'] : ['m'];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;
            const selector = `${themeSelector}.${sizeSelector}`;

            geminiReact.suite(selector, (suite) => {
                const props = { theme, size };
                const template = (
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
