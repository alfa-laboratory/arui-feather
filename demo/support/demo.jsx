import React from 'react';
import DemoSection from '../demo-section';
import Support from '../../src/support';
import ThemeProvider from '../../src/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Support
                            city='Город'
                            phone='+7 123 123 12 31'
                        />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Support
                            city='Город'
                            phone='+7 123 123 12 31'
                        />
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
