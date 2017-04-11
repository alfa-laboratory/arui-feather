import React from 'react';
import Amount from '../../src/amount/amount';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider/theme-provider';

const AMOUNT = {
    value: 123535,
    currency: {
        code: 'RUR',
        minority: 100
    }
};

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            { this.renderAmounts() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            { this.renderAmounts() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            { this.renderHeadingAmounts() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            { this.renderHeadingAmounts() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderAmounts() {
        return ['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <Amount
                    size={ size }
                    amount={ AMOUNT }
                />
            </div>
        ));
    }

    renderHeadingAmounts() {
        return ['s', 'm', 'l', 'xl'].map(size => (
            <div key={ size }>
                <Amount
                    isHeading={ true }
                    size={ size }
                    amount={ AMOUNT }
                />
            </div>
        ));
    }

}

export default Demo;
