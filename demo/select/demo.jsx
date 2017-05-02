import React from 'react';
import DemoSection from '../demo-section';
import Icon from '../../src/icon/icon';
import Label from '../../src/label/label';
import Select from '../../src/select/select';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import './demo.css';

const OPTIONS_1 = [
    {
        value: 1,
        text: 'Календарь',
        checkedText: 'Calendar',
        icon: <Icon icon='calendar' />
    },
    {
        value: 2,
        text: 'Пользователь',
        checkedText: 'User',
        icon: <Icon icon='user' />
    },
    {
        value: 3,
        text: 'Поиск',
        checkedText: 'Search',
        icon: <Icon icon='search' />
    }
];

const OPTIONS_2 = [
    {
        value: 1,
        text: 'Orange'
    },
    {
        value: 2,
        text: 'Banana'
    },
    {
        value: 3,
        text: 'Apple'
    }
];

const OPTIONS_3 = [
    {
        text: 'MenuItem 1',
        value: '1'
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 2',
                value: '2'
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 3',
                value: '3'
            },
            {
                text: 'MenuItem 4',
                value: '4'
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 5',
                value: '5'
            },
            {
                text: 'MenuItem 6',
                value: '6'
            },
            {
                text: 'MenuItem 7',
                value: '7'
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 8',
                value: '8'
            },
            {
                text: 'MenuItem 9',
                value: '9'
            },
            {
                text: 'MenuItem 10',
                value: '10'
            },
            {
                text: 'MenuItem 11',
                value: '11'
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 12',
                value: '12'
            },
            {
                text: 'MenuItem 13',
                value: '13'
            },
            {
                text: 'MenuItem 14',
                value: '14'
            },
            {
                text: 'MenuItem 15',
                value: '15'
            },
            {
                text: 'MenuItem 16',
                value: '16'
            }
        ]
    },
    {
        type: 'group',
        title: 'Group Title',
        content: [
            {
                text: 'MenuItem 17',
                value: '17'
            },
            {
                text: 'MenuItem 18',
                value: '18'
            },
            {
                text: 'MenuItem 19',
                value: '19'
            },
            {
                text: 'MenuItem 20',
                value: '20'
            },
            {
                text: 'MenuItem 21',
                value: '21'
            },
            {
                text: 'MenuItem 22',
                value: '22'
            },
            {
                text: 'MenuItem 23',
                value: '23'
            },
            {
                text: 'MenuItem 24',
                value: '24'
            },
            {
                text: 'MenuItem 25',
                value: '25'
            },
            {
                text: 'MenuItem 26',
                value: '26'
            }
        ]
    }
];

const OPTIONS_4 = [
    {
        value: 1,
        text: 'Orange',
        description: <Label size='s'>вариант - Orange</Label>
    },
    {
        value: 2,
        text: 'Banana',
        description: <Label size='s'>вариант - Banana</Label>
    },
    {
        value: 3,
        text: 'Apple',
        description: <Label size='s'>вариант - Apple</Label>
    }
];

function getOptionsList(size, items) {
    return items.map((item) => {
        let iconProps = { ...item.icon.props, size };

        return { ...item, icon: <Icon { ...iconProps } /> };
    });
}


function getSelectList(mode, placeholder, items, isNeedIcons) {
    let selectIndex = 0;
    let sizes = ['s', 'm', 'l', 'xl'];
    return (
        <div className='group'>
            { sizes.map(size =>
                <Select
                    key={ size }
                    size={ size }
                    mode={ mode }
                    placeholder={ placeholder }
                    name={ `select_${selectIndex}_${size}` }
                    options={ isNeedIcons ? getOptionsList(size, items) : items }
                />
            ) }
        </div>
    );
}

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with custom options, mode=radio</Label>
                            <div className='group'>
                                <Select
                                    size='s'
                                    mode='radio'
                                    options={ OPTIONS_4 }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with custom button, mode=radio</Label>
                            <div className='group'>
                                <Select
                                    mode='radio'
                                    options={ OPTIONS_1 }
                                    renderButtonContent={ this.renderRadioButtonContent }
                                    error='Something went wrong'
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with custom button, mode=check</Label>
                            <div className='group'>
                                <Select
                                    mode='check'
                                    options={ OPTIONS_1 }
                                    renderButtonContent={ this.renderCheckButtonContent }
                                    error='Something went wrong'
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with mode=check</Label>
                            { getSelectList('check', 'Choose network', OPTIONS_1, true) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Label>Select with mode=check</Label>
                            { getSelectList('check', 'Choose network', OPTIONS_1, true) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with mode=radio-check</Label>
                            { getSelectList('radio-check', 'Choose fruit', OPTIONS_2, false) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Label>Select with mode=radio-check</Label>
                            { getSelectList('radio-check', 'Choose fruit', OPTIONS_2, false) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with width=available, mode=radio</Label>
                            <Select
                                size='m'
                                mode='radio'
                                width='available'
                                options={ OPTIONS_2 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with width=available, mode=radio</Label>
                            <Select
                                size='m'
                                mode='radio'
                                width='available'
                                options={ OPTIONS_2 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with width=available, mode=radio-check</Label>
                            <Select
                                size='m'
                                mode='radio-check'
                                width='available'
                                placeholder='Choose wisely'
                                options={ OPTIONS_3 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with width=available, mode=radio-check</Label>
                            <Select
                                size='m'
                                mode='radio-check'
                                width='available'
                                placeholder='Choose wisely'
                                options={ OPTIONS_3 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Label>Select with group and mode=check</Label>
                            { getSelectList('check', 'Choose', OPTIONS_3, false) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label>Select with group and mode=check</Label>
                            { getSelectList('check', 'Choose', OPTIONS_3, false) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Disabled select</Label>
                            <Select
                                size='m'
                                mode='radio'
                                disabled={ true }
                                width='available'
                                placeholder='Choose...'
                                options={ OPTIONS_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Disabled select</Label>
                            <Select
                                size='m'
                                mode='radio'
                                disabled={ true }
                                width='available'
                                placeholder='Choose...'
                                options={ OPTIONS_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with error</Label>
                            <Select
                                size='m'
                                mode='radio'
                                width='available'
                                placeholder='Choose...'
                                options={ OPTIONS_1 }
                                error='Something goes wrong...'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div
                            style={ {
                                width: '50%'
                            } }
                        >
                            <Label>Select with error</Label>
                            <Select
                                size='m'
                                mode='radio'
                                width='available'
                                placeholder='Choose...'
                                options={ OPTIONS_1 }
                                error='Something goes wrong...'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderRadioButtonContent(checkedItems) {
        let item = checkedItems[0];

        return (
            <span>Выбран элемент: { item ? item.checkedText || item.text : '' }</span>
        );
    }

    renderCheckButtonContent(checkedItems) {
        return (
            <span>Выбрано элементов: { checkedItems.length }</span>
        );
    }
}

export default Demo;
