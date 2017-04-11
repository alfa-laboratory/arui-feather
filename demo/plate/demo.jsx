import React from 'react';
import DemoSection from '../demo-section';
import Link from '../../src/link/link';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph/paragraph';
import Plate from '../../src/plate/plate';
import ThemeProvider from '../../src/theme-provider/theme-provider';

/* eslint no-alert: 0 */
class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Plate>
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                                <Link>Plate Link</Link>
                            </Plate>
                            <Plate hasCloser={ true } onCloserClick={ function () { alert('plate close'); } }>
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                                <Link>Plate Link</Link>
                            </Plate>
                            <Plate isFlat={ true }>
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                                <Link>Plate Link</Link>
                            </Plate>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Plate>
                                <ThemeProvider theme='alfa-on-white'>
                                    <div>
                                        <Paragraph>
                                            { LOREM_IPSUM.slice(0, 3) }
                                        </Paragraph>
                                        <Link>Plate Link</Link>
                                    </div>
                                </ThemeProvider>
                            </Plate>
                            <Plate hasCloser={ true } onCloserClick={ function () { alert('plate close'); } }>
                                <ThemeProvider theme='alfa-on-white'>
                                    <div>
                                        <Paragraph>
                                            { LOREM_IPSUM.slice(0, 3) }
                                        </Paragraph>
                                        <Link>Plate Link</Link>
                                    </div>
                                </ThemeProvider>
                            </Plate>
                            <Plate isFlat={ true } >
                                <Paragraph>
                                    { LOREM_IPSUM.slice(0, 3) }
                                </Paragraph>
                                <Link>Plate Link</Link>
                            </Plate>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
