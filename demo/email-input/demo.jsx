import React from 'react';
import DemoSection from '../demo-section';
import EmailInput from '../../src/email-input/email-input';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <EmailInput />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <EmailInput />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
