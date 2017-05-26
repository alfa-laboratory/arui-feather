import React from 'react';
import Button from '../../src/button';
import DemoSection from '../demo-section';
import Spin from '../../src/spin';
import ThemeProvider from '../../src/theme-provider';

import './demo.css';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            { this.renderSpins() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            { this.renderSpins() }
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderSpins() {
        return ['s', 'm', 'l', 'xl'].map(size => (
            <span key={ size } className='layout'>
                <Button
                    icon={
                        <Spin
                            size={ size }
                            visible={ true }
                        />
                    }
                    size={ size }
                >
                    Кнопка
                </Button>
            </span>
        ));
    }
}

export default Demo;
