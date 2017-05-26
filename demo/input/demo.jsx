import React from 'react';
import DemoSection from '../demo-section';
import Input from '../../src/input';
import Radio from '../../src/radio';
import RadioGroup from '../../src/radio-group';
import ThemeProvider from '../../src/theme-provider';

import cn from '../../src/cn';
import './demo.css';

@cn('demo')
class Demo extends React.Component {
    render(cn) {
        return (
            <div className={ cn }>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        size='m'
                                        placeholder='Input...'
                                        rightAddons={ this.renderAddons() }
                                        leftAddons={ this.renderAddons() }
                                    />
                                </span>
                            </div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        size='m'
                                        placeholder='Input with width available...'
                                        rightAddons={ this.renderAddons() }
                                        leftAddons={ this.renderAddons() }
                                        width='available'
                                    />
                                </span>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        view='line'
                                        size='m'
                                    />
                                </span>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <span className={ cn('layout') }>
                                <Input
                                    size='m'
                                    placeholder='Input...'
                                    error='something went wrong'
                                />
                            </span>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' />
                            </span>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' clear={ true } />
                            </span>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' disabled={ true } />
                            </span>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        size='m'
                                        placeholder='Input...'
                                        rightAddons={ this.renderAddons() }
                                        leftAddons={ this.renderAddons() }
                                    />
                                </span>
                            </div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        size='m'
                                        placeholder='Input with width available...'
                                        rightAddons={ this.renderAddons() }
                                        leftAddons={ this.renderAddons() }
                                        width='available'
                                    />
                                </span>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>

                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                <span className={ cn('layout') }>
                                    <Input
                                        view='line'
                                        size='xl'
                                    />
                                </span>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>


                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <span className={ cn('layout') }>
                                <Input
                                    size='m'
                                    placeholder='Input...'
                                    error='something went wrong'
                                />
                            </span>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' />
                            </span>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' clear={ true } />
                            </span>
                            <span className={ cn('layout') }>
                                <Input placeholder='Input...' disabled={ true } />
                            </span>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderAddons() {
        let buttonControlNodes = [1, 2, 3].map(item => (
            <Radio
                key={ item }
                size='m'
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
}

export default Demo;
