import React from 'react';
import DemoSection from '../demo-section';
import Icon from '../../src/icon';
import ThemeProvider from '../../src/theme-provider';

const ICONS = ['error', 'fail', 'ok', 'ok_filled', 'calendar', 'search', 'close', 'user'];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            { ICONS.map(icon => this.renderIcons(icon)) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            { ICONS.map(icon => this.renderIcons(icon)) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-colored'>
                        <div>
                            { ['error', 'ok'].map(icon => this.renderIcons(icon)) }
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    renderIcons(propValue) {
        let props = ['s', 'm', 'l', 'xl', 'xxl'].map(size => (
            {
                size,
                icon: propValue
            }
        ));

        return (
            <div>
                { props.map(propsItem => <Icon { ...propsItem } />) }
            </div>
        );
    }
}

export default Demo;
