import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Input from '../src/input';
import Radio from '../src/radio';
import RadioGroup from '../src/radio-group';

function renderAddons(size) {
    let buttonControlNodes = [1, 2, 3].map(item => (
        <Radio
            key={ item }
            size={ size }
            type={ 'button' }
            text={ item }
        />
    ));

    return (
        <RadioGroup type={ 'button' }>
            { buttonControlNodes }
        </RadioGroup>
    );
}

const NAME = 'input';
const THEMES = ['alfa-on-color', 'alfa-on-white'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const PROP_SETS = [
    {
        placeholder: 'Input'
    },
    {
        placeholder: 'Input with width available',
        width: 'available'
    },
    {
        placeholder: 'Input',
        error: 'Something went wrong'
    },
    {
        placeholder: 'Input',
        clear: true
    },
    {
        disabled: true
    }
];

geminiReact.suite(NAME, function () {
    THEMES.forEach((theme) => {
        let themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            let sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                let selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                if (set.view === 'line' && size !== 'm') {
                    return;
                }

                geminiReact.suite(selector, function (suite) {
                    let props = {
                        theme,
                        size,
                        rightAddons: (index === 0 || index === 1) && renderAddons(size),
                        leftAddons: (index === 0 || index === 1) && renderAddons(size),
                        ...set
                    };
                    let template = (
                        <GeminiBox theme={ theme } width={ set.width }>
                            <Input { ...props } />
                        </GeminiBox>
                    );

                    if (set.disabled) {
                        suite
                            .render(template)
                            .capture('plain');
                    } else {
                        suite
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
