import React from 'react';
import { autobind } from 'core-decorators';

import DemoSection from '../demo-section';
import MoneyInput from '../../src/money-input/money-input';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    state = {
        money: ''
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <MoneyInput value={ this.state.money } onChange={ this.handleMoneyChange } />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <MoneyInput />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleMoneyChange(money) {
        this.setState({ money });
    }
}

export default Demo;
