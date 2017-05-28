import React from 'react';
import { autobind } from 'core-decorators';

import Button from '../../src/button/button';
import Paragraph from '../../src/paragraph/paragraph';
import DemoSection from '../demo-section';
import SlideDown from '../../src/slide-down/slide-down';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import { LOREM_IPSUM } from '../../src/vars';

class Demo extends React.Component {
    state = {
        isExpanded: true
    }

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <Button
                                    onClick={ this.handleSlideDownToggle }
                                >
                                    Toggle slide down
                                </Button>
                                <SlideDown isExpanded={ this.state.isExpanded }>
                                    <Paragraph>
                                        { LOREM_IPSUM.slice(0, 3) }
                                    </Paragraph>
                                </SlideDown>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleSlideDownToggle() {
        this.setState({
            isExpanded: !this.state.isExpanded
        });
    }
}

export default Demo;
