import React from 'react';
import DemoSection from '../demo-section';
import Label from '../../src/label/label';
import Menu from '../../src/menu/menu';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import './demo.css';

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

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Menu
                                view='horizontal'
                                size='l'
                                content={ MENU_1 }
                            />
                            <Menu
                                content={ MENU_2 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Menu
                                view='horizontal'
                                size='l'
                                content={ MENU_1 }
                            />
                            <Menu
                                content={ MENU_2 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label size='l'>
                                { 'Меню с множественным выбором (mode="check")' }
                            </Label>
                            <Menu
                                mode='check'
                                view='horizontal'
                                size='l'
                                content={ MENU_1 }
                            />
                            <Menu
                                mode='check'
                                content={ MENU_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Label size='l'>
                                { 'Меню с одиночным обязательным выбором (mode="radio")' }
                            </Label>
                            <Menu
                                mode='radio'
                                view='horizontal'
                                size='l'
                                content={ MENU_1 }
                            />
                            <Menu
                                mode='radio'
                                content={ MENU_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Label size='l'>
                                { 'Меню с одиночным необязательным выбором (mode="radio-check")' }
                            </Label>
                            <Menu
                                mode='radio-check'
                                view='horizontal'
                                size='l'
                                content={ MENU_1 }
                            />
                            <Menu
                                mode='radio-check'
                                content={ MENU_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Menu
                                mode='check'
                                view='horizontal'
                                size='l'
                                disabled={ true }
                                checkedItems={ ['value1', 'value3'] }
                                content={ MENU_1 }
                            />
                            <Menu
                                mode='radio'
                                checkedItems={ ['value2'] }
                                disabled={ true }
                                content={ MENU_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Menu
                                mode='check'
                                view='horizontal'
                                size='l'
                                disabled={ true }
                                checkedItems={ ['value1'] }
                                content={ MENU_1 }
                            />
                            <Menu
                                mode='radio'
                                checkedItems={ ['value2'] }
                                disabled={ true }
                                content={ MENU_1 }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
