import React from 'react';
import Checkbox from '../../src/checkbox';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider';

import './demo.css';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='m'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='l'
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='m'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='l'
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='m'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='l'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='m'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                text='Чекбокс'
                                size='l'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='s'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='m'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='l'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='xl'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='s'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='m'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='l'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='xl'
                                text='Чекбокс'
                                type='button'
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='s'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='m'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='l'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Checkbox
                                size='xl'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='s'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='m'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='l'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Checkbox
                                size='xl'
                                text='Чекбокс'
                                type='button'
                                disabled={ true }
                            />
                        </span>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
