import React from 'react';
import Button from '../../src/button';
import DemoSection from '../demo-section';
import { LOREM_IPSUM } from '../../src/vars';
import Paragraph from '../../src/paragraph';
import Popup from '../../src/popup';
import PopupContainerProvider from '../../src/popup-container-provider';
import ThemeProvider from '../../src/theme-provider';

import cn from '../../src/cn';

import './demo.css';

@cn('popup-demo')
class Demo extends React.Component {
    state = {
        popup1: false,
        popup2: false,
        popup3: false,
        popup4: false,
        popup5: false,
        popup6: false,
        popup7: false,
        popup8: false
    };

    popup1;
    popup2;
    popup3;
    popup4;
    popup5;
    popup6;
    popup7;
    popup8;

    target1;
    target2;
    target3;
    target4;
    target5;
    target6;
    target7;
    target8;

    componentDidMount() {
        this.popup1.setTarget(this.target1.control);
        this.popup2.setTarget(this.target2.control);
        this.popup3.setTarget(this.target3.control);
        this.popup4.setPosition(500, 400);
        this.popup5.setTarget(this.target5.control);
        this.popup6.setTarget(this.target6.control);
        this.popup7.setTarget(this.target7.control);
        this.popup8.setTarget(this.target8.control);
    }

    render(cn) {
        return (
            <div className={ cn }>
                <div className={ cn('main') }>
                    <DemoSection theme='alfa-on-color'>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target1 = target; } }
                                    size='s'
                                    onClick={ () => { this.setState({ popup1: !this.state.popup1 }); } }
                                >
                                    Click me
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup1 = popup; } }
                                    directions={ ['top-center', 'bottom-center'] }
                                    size='s'
                                    type='tooltip'
                                    visible={ this.state.popup1 }
                                >
                                    Popup on top or bottom
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-white'>
                        <ThemeProvider theme='alfa-on-color'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target2 = target; } }
                                    size='m'
                                    onClick={ () => { this.setState({ popup2: !this.state.popup2 }); } }
                                >
                                    Click me
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup2 = popup; } }
                                    directions={ ['right-center', 'right-top', 'right-bottom'] }
                                    size='m'
                                    type='tooltip'
                                    mainOffset={ 13 }
                                    visible={ this.state.popup2 }
                                    invalid={ true }
                                >
                                    Invalid popup
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-color'>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target3 = target; } }
                                    size='l'
                                    onMouseEnter={ () => { this.setState({ popup3: true }); } }
                                    onMouseLeave={ () => { this.setState({ popup3: false }); } }
                                >
                                    Hover me
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup3 = popup; } }
                                    directions={ ['right-center', 'right-top', 'right-bottom'] }
                                    size='l'
                                    mainOffset={ 0 }
                                    type='tooltip'
                                    visible={ this.state.popup3 }
                                    onMouseLeave={ () => { this.setState({ popup3: false }); } }
                                    onMouseEnter={ () => { this.setState({ popup3: true }); } }
                                >
                                    Popup
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-white'>
                        <ThemeProvider theme='alfa-on-color'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target4 = target; } }
                                    size='xl'
                                    onClick={ () => { this.setState({ popup4: !this.state.popup4 }); } }
                                >
                                    Show popup at position(500px, 400px)
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup4 = popup; } }
                                    size='xl'
                                    visible={ this.state.popup4 }
                                    target='position'
                                >
                                    Popup with position 500px 400px
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-color'>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target5 = target; } }
                                    size='m'
                                    onMouseEnter={ () => { this.setState({ popup5: true }); } }
                                    onMouseLeave={ () => { this.setState({ popup5: false }); } }
                                >
                                    Hover me
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup5 = popup; } }
                                    height='available'
                                    visible={ this.state.popup5 }
                                    onMouseLeave={ () => { this.setState({ popup5: false }); } }
                                    onMouseEnter={ () => { this.setState({ popup5: true }); } }
                                >
                                    Popup with available height
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-white'>
                        <ThemeProvider theme='alfa-on-color'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target6 = target; } }
                                    size='m'
                                    onMouseEnter={ () => { this.setState({ popup6: true }); } }
                                    onMouseLeave={ () => { this.setState({ popup6: false }); } }
                                >
                                    Hover me
                                </Button>
                                <Popup
                                    ref={ (ref) => { this.popup6 = ref; } }
                                    height='available'
                                    directions={ ['right-center', 'right-top', 'right-bottom'] }
                                    visible={ this.state.popup6 }
                                    onMouseLeave={ () => { this.setState({ popup6: false }); } }
                                    onMouseEnter={ () => { this.setState({ popup6: true }); } }
                                >
                                    Popup with available height
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                    <DemoSection theme='alfa-on-color'>
                        <ThemeProvider theme='alfa-on-white'>
                            <div>
                                <Button
                                    ref={ (target) => { this.target7 = target; } }
                                    size='m'
                                    onClick={ () => { this.setState({ popup7: !this.state.popup7 }); } }
                                >
                                    Click me
                                </Button>
                                <Popup
                                    ref={ (popup) => { this.popup7 = popup; } }
                                    autoclosable={ true }
                                    visible={ this.state.popup7 }
                                    onClickOutside={ () => { this.setState({ popup7: false }); } }
                                >
                                    { 'Popup with autoclosable="true"' }
                                </Popup>
                            </div>
                        </ThemeProvider>
                    </DemoSection>
                </div>
                <PopupContainerProvider className={ cn('aside') }>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Paragraph>
                                { LOREM_IPSUM.slice(0, 3) }
                            </Paragraph>
                            <DemoSection theme='alfa-on-white'>
                                <ThemeProvider theme='alfa-on-color'>
                                    <div>
                                        <Button
                                            ref={ (target) => { this.target8 = target; } }
                                            size='s'
                                            onClick={ () => { this.setState({ popup8: !this.state.popup8 }); } }
                                        >
                                            Click me
                                        </Button>
                                        <Popup
                                            ref={ (popup) => { this.popup8 = popup; } }
                                            directions={ ['bottom-left'] }
                                            size='s'
                                            type='tooltip'
                                            visible={ this.state.popup8 }
                                        >
                                            Popup with two lines of text in
                                            custom scrollable fixed container renders just fine
                                        </Popup>
                                    </div>
                                </ThemeProvider>
                            </DemoSection>
                            <Paragraph>
                                { LOREM_IPSUM.slice(0, 3) }
                            </Paragraph>
                        </div>
                    </ThemeProvider>
                </PopupContainerProvider>
            </div>
        );
    }
}

export default Demo;
