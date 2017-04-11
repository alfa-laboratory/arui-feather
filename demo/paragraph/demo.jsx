import React from 'react';
import DemoSection from '../demo-section';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph/paragraph';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-white'>
                        <Paragraph
                            view='lead'
                            mark='Ex'
                        >
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <Paragraph>
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </ThemeProvider>
                    <ThemeProvider theme='alfa-on-color'>
                        <Paragraph
                            view='lead'
                            mark='Ex'
                        >
                            { LOREM_IPSUM.slice(0, 3) }
                        </Paragraph>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
