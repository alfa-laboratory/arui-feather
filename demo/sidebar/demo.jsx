import React from 'react';
import { autobind } from 'core-decorators';

import Button from '../../src/button';
import DemoSection from '../demo-section';
import Input from '../../src/input';
import Heading from '../../src/heading';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph';
import Sidebar from '../../src/sidebar';
import ThemeProvider from '../../src/theme-provider';

import cn from '../../src/cn';

@cn('demo')
class Demo extends React.Component {
    state = {
        sidebar: false
    };

    render(cn) {
        return (
            <div>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className={ cn('button-layout') }>
                                <div style={ { marginBottom: 20 } }>
                                    <Button onClick={ this.toggleSidebar }>Toggle Sidebar</Button>
                                </div>
                                <Paragraph>
                                    { LOREM_IPSUM }
                                </Paragraph>
                                <Sidebar
                                    visible={ this.state.sidebar }
                                    onCloserClick={ this.toggleSidebar }
                                >
                                    <Heading size='m'>
                                        Я вместительный холодильник с мороженой рыбой
                                    </Heading>
                                    <div style={ { marginBottom: 20 } }>
                                        <Input
                                            size='m'
                                            placeholder='Input...'
                                            error='Something went wrong'
                                        />
                                    </div>
                                    <Paragraph>
                                        { LOREM_IPSUM.slice(0, 3) }
                                    </Paragraph>
                                    <Button size='m' view='extra'>Рыба</Button>
                                </Sidebar>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    toggleSidebar() {
        this.setState({ sidebar: !this.state.sidebar });
    }
}

export default Demo;
