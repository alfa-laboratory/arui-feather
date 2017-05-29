import React from 'react';
import { autobind } from 'core-decorators';

import Attach from '../../src/attach';
import DemoSection from '../demo-section';
import Icon from '../../src/icon';
import ThemeProvider from '../../src/theme-provider';

import './demo.css';

class Demo extends React.Component {
    state = {
        value: null
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <Attach
                                    size='s'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='m'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='l'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                    disabled={ true }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <Attach
                                    size='s'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='m'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='l'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                    disabled={ true }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <Attach
                                    size='s'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='s' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='m'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='m' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='l'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='l' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='xl' icon='search' />
                                    } }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <Attach
                                    size='s'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='s' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='m'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='m' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='l'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='l' icon='search' />
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Attach
                                    size='xl'
                                    buttonContent='Please, choose a file'
                                    noFileText='file in pdf format'
                                    buttonProps={ {
                                        pseudo: true,
                                        icon: <Icon size='xl' icon='search' />
                                    } }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <Attach
                                    size='s'
                                    buttonContent={ this.state.value ? 'Choose another file' : 'Choose a file' }
                                    onChange={ this.handleChange }
                                    value={ this.state.value }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleChange(value) {
        this.setState({
            value
        });
    }
}

export default Demo;
