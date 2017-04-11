import React from 'react';
import DemoSection from '../demo-section';
import Radio from '../../src/radio/radio';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import './demo.css';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' error={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' error={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' error={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' error={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' disabled={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='m' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio text='Радио' size='l' disabled={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='s' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='m' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='l' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='xl' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='s' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='m' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='l' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='xl' text='Радио' type='button' />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='s' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='m' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='l' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <span className='layout'>
                            <Radio size='xl' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='s' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='m' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='l' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <span className='layout'>
                            <Radio size='xl' text='Радио' type='button' disabled={ true } />
                        </span>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
