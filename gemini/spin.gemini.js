import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Button from '../src/button';
import Spin from '../src/spin';

const NAME = 'spin';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {}
];

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = {
                        theme,
                        size,
                        icon: <Spin size={ size } visible={ true } />
                    };
                    const template = (
                        <GeminiBox theme={ theme }>
                            <Button { ...props }>
                                Button
                            </Button>
                        </GeminiBox>
                    );

                    suite
                        .render(template)
                        .capture('plain');
                });
            });
        });
    });
});
