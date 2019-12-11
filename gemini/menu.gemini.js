import GeminiBox from '../gemini-utils/gemini-box/gemini-box';
import Label from '../src/label';
import Menu from '../src/menu';

const NAME = 'menu';
const THEMES = ['alfa-on-white', 'alfa-on-color'];
const SIZES = process.env.ALL_SIZES ? ['s', 'm', 'l', 'xl'] : ['m'];

const MENU_1 = [
    {
        type: 'item',
        content: 'MenuItem 1',
        value: 'value1',
        props: {
            url: '#1'
        }
    },
    {
        type: 'item',
        content: 'MenuItem 2',
        value: 'value2',
        props: {
            url: '#2'
        }
    },
    {
        type: 'item',
        content: 'MenuItem 3',
        value: 'value3',
        props: {
            url: '#3',
            disabled: true
        }
    }
];

const MENU_2 = [
    {
        type: 'item',
        content: 'MenuItem 1',
        value: '1',
        props: {
            url: '#1'
        }
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                type: 'item',
                content: 'MenuItem 2',
                value: '2',
                props: {
                    url: '#2'
                }
            },
            {
                type: 'item',
                content: 'MenuItem 3',
                value: '3',
                props: {
                    url: '#3'
                }
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                type: 'item',
                content: 'MenuItem 4',
                value: '4',
                props: {
                    url: '#4'
                }
            },
            {
                type: 'item',
                content: 'MenuItem 5',
                value: '5',
                props: {
                    url: '#5',
                    type: 'dropdown',
                    popup: 'Popup Menu'
                }
            }
        ]
    }
];

/* eslint-disable object-curly-newline */
const PROP_SETS = [
    { view: 'horizontal', content: MENU_1 },
    { mode: 'check', content: MENU_2, checkedItems: ['value1', 'value3'] },
    { mode: 'radio', content: MENU_2, checkedItems: ['value1'] },
    { mode: 'radio-check', view: 'horizontal', content: MENU_2, checkedItems: ['value2'] },
    { mode: 'check', view: 'horizontal', disabled: true, content: MENU_1, checkedItems: ['value1', 'value3'] },
    { mode: 'radio', disabled: true, content: MENU_1, checkedItems: ['value1'] }
];
/* eslint-enable object-curly-newline */

geminiReact.suite(NAME, () => {
    THEMES.forEach((theme) => {
        const themeSelector = `${NAME}_theme_${theme}`;

        SIZES.forEach((size) => {
            const sizeSelector = `${NAME}_size_${size}`;

            PROP_SETS.forEach((set, index) => {
                const selector = `${themeSelector}.${sizeSelector}.${NAME}_prop-set_${index + 1}`;

                geminiReact.suite(selector, (suite) => {
                    const props = { theme, size, ...set };
                    const template = (
                        <GeminiBox theme={ theme }>
                            <div>
                                {
                                    set.mode &&
                                    <Label size={ size }>
                                        {
                                            (set.mode === 'check' &&
                                                'Меню с множественным выбором (mode="check")') ||
                                            (set.mode === 'radio' &&
                                                'Меню с одиночным обязательным выбором (mode="radio")') ||
                                            (set.mode === 'radio-check' &&
                                                'Меню с одиночным необязательным выбором (mode="radio-check")'
                                            )
                                        }
                                    </Label>
                                }
                                <Menu { ...props }>
                                    Menu Item
                                </Menu>
                            </div>
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
