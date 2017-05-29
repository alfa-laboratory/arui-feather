import React from 'react';
import CheckBox from '../../src/checkbox';
import CheckBoxGroup from '../../src/checkbox-group';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <CheckBoxGroup>
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <CheckBoxGroup type='button'>
                            <CheckBox
                                disabled={ true }
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                disabled={ true }
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <CheckBoxGroup type='button'>
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <CheckBoxGroup type='line'>
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <CheckBoxGroup>
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <CheckBoxGroup type='button'>
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                            <CheckBox
                                text='Чекбокс'
                                type='button'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <CheckBoxGroup type='line'>
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                            <CheckBox
                                text='Чекбокс'
                            />
                        </CheckBoxGroup>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
