import React from 'react';
import { autobind } from 'core-decorators';

import Collapse from '../../src/collapse';
import DemoSection from '../demo-section';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph';
import ThemeProvider from '../../src/theme-provider';

class Demo extends React.Component {
    state = {
        isExpanded: true
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Collapse
                                collapsedLabel='Подробнее'
                                expandedLabel='Скрыть'
                            >
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                            </Collapse>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Collapse
                                collapsedLabel='Подробнее'
                                expandedLabel='Скрыть'
                                isExpanded={ this.state.isExpanded }
                                onExpandedChange={ value => this.handleExpandedChange(value) }
                            >
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                            </Collapse>
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
