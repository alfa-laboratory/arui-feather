import React from 'react';
import Button from '../../src/button/button';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import './demo.css';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='action'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='action' disabled={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='action'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='action'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='action' disabled={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='action' disabled={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' pseudo={ true }>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' pseudo={ true }>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } pseudo={ true }>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='extra'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } view='extra'>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='extra'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } view='extra'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } view='extra'>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='other'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } view='other'>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' view='other'>Button</Button>
                                </div>
                            </div>
                            <div className='layout'>
                                <div className='layout-button'>
                                    <Button size='s' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='m' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='l' disabled={ true } view='other'>Button</Button>
                                </div>
                                <div className='layout-button'>
                                    <Button size='xl' disabled={ true } view='other'>Button</Button>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
