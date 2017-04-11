import React from 'react';
import DemoSection from '../demo-section';
import Heading from '../../src/heading/heading';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Heading>Heading H1 by default</Heading>
                            <Heading size='s'>Heading H4</Heading>
                            <Heading size='m'>Heading H3</Heading>
                            <Heading size='l'>Heading H2</Heading>
                            <Heading size='xl'>Heading H1</Heading>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Heading>Heading H1  by default</Heading>
                            <Heading size='s'>Heading H4</Heading>
                            <Heading size='m'>Heading H3</Heading>
                            <Heading size='l'>Heading H2</Heading>
                            <Heading size='xl'>Heading H1</Heading>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
