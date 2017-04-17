import React from 'react';
import { autobind } from 'core-decorators';

import Collapsible from '../../src/collapsible/collapsible';
import Checkbox from '../../src/checkbox/checkbox';
import DemoSection from '../demo-section';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph/paragraph';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    state = {
        isExpanded: false
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Collapsible
                                isExpanded={ true }
                            >
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                            </Collapsible>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Checkbox
                                checked={ this.state.isExpanded }
                                text='Развернуть'
                                onChange={ value => this.handleExpandedChange(value) }
                            />
                            <Collapsible
                                isExpanded={ this.state.isExpanded }
                            >
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                            </Collapsible>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleExpandedChange(value) {
        this.setState({ isExpanded: value });
    }
}

export default Demo;
