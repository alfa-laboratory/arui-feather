import React from 'react';
import Copyright from '../../src/copyright/copyright';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Copyright />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Copyright />
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
