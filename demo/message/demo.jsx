import React from 'react';
import Button from '../../src/button/button';
import DemoSection from '../demo-section';
import Message from '../../src/message/message';
import ThemeProvider from '../../src/theme-provider/theme-provider';

class Demo extends React.Component {
    state = {
        message1: false,
        message2: false
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div>
                                <Button
                                    onClick={ () => { this.setState({ message1: !this.state.message1 }); } }
                                >
                                    Toggle message
                                </Button>
                                <Message
                                    visible={ this.state.message1 }
                                >
                                    Some message here
                                </Message>
                                <Message
                                    type='popup'
                                    visible={ this.state.message1 }
                                >
                                    Some message here
                                </Message>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div>
                                <Button
                                    onClick={ () => { this.setState({ message2: !this.state.message2 }); } }
                                >
                                    Toggle message
                                </Button>
                                <Message
                                    visible={ this.state.message2 }
                                >
                                    Some message here
                                </Message>
                                <Message
                                    type='popup'
                                    visible={ this.state.message2 }
                                >
                                    Some message here
                                </Message>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
