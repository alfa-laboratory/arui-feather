import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import PhoneInput from '../src/phone-input/phone-input';

const NAME = 'phone-input';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    { placeholder: '+7 000 000 00 00' },
    { placeholder: '+7 000 000 00 00', disabled: true }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, function (suite) {
                    let props = { theme, size, ...set };
                    let template = (
                        <GeminiBox theme={ theme }>
                            <PhoneInput { ...props } />
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
