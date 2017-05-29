import React from 'react';
import DemoSection from '../demo-section';
import Highlight from '../../src/highlight';
import ThemeProvider from '../../src/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Highlight>
                            Notice me
                        </Highlight>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Highlight>
                            Notice me
                        </Highlight>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
