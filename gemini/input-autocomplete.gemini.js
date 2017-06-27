import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import InputAutocomplete from '../src/input-autocomplete';

const NAME = 'input-autocomplete';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const OPTIONS = [
    { value: 'Facebook' },
    { value: 'Twitter' },
    { value: 'LinkedIn' },
    { value: 'Sina Weibo' },
    { value: 'Pinterest' },
    { value: 'VKontakte' },
    { value: 'Instagram' },
    { value: 'Tumblr' },
    { value: 'Flickr' },
    { value: 'Odnoklassniki' }
];

const PROP_SETS = [
    { placeholder: 'Input', opened: true, options: OPTIONS },
    { placeholder: 'Input', disabled: true }
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
                            <InputAutocomplete { ...props } />
                        </GeminiBox>
                    );

                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
                            .setExtraCaptureElements(['.popup'])
                            .render(template)
                            .capture('plain')
                            .capture('hovered', function (actions) {
                                actions.mouseMove(this.renderedComponent);
                            })
                            .capture('pressed', function (actions) {
                                actions.mouseDown(this.renderedComponent);
                            })
                            .capture('focused', function (actions, find) {
                                actions.focus(find('.input__control'));
                            });
                    }
                });
            });
        });
    });
});
