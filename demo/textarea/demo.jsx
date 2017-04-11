import React from 'react';
import DemoSection from '../demo-section';
import Textarea from '../../src/textarea/textarea';
import ThemeProvider from '../../src/theme-provider/theme-provider';

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
                            <Textarea placeholder='Textarea...' />
                        </div>
                    </ThemeProvider>

                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Textarea
                                placeholder='Textarea...'
                                error='something went wrong'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Textarea
                                placeholder='Textarea autosize...'
                                autosize={ true }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Textarea placeholder='Textarea...' />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Textarea
                                placeholder='Textarea...'
                                error='something went wrong'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Textarea
                                placeholder='Textarea autosize...'
                                autosize={ true }
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
