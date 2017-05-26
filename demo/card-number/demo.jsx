import React from 'react';
import CardNumber from '../../src/card-number';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <dl>
                                <dt>1234029302029321</dt>
                                <dd>
                                    <CardNumber
                                        value='1234029302029321'
                                    />
                                </dd>
                            </dl>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <dt>Mask number 1234****9321</dt>
                            <dd>
                                <CardNumber>
                                    1234*********9321
                                </CardNumber>
                            </dd>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
