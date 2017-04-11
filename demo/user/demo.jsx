import React from 'react';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider/theme-provider';
import User from '../../src/user/user';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <User
                            url='#'
                            text='Клиент'
                        />
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <User
                            url='#'
                            text='Клиент'
                        />
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
