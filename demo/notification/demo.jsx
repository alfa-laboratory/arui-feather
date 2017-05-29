import Button from '../../src/button';
import DemoSection from '../demo-section';
import Icon from '../../src/icon';
import Notification from '../../src/notification';
import ThemeProvider from '../../src/theme-provider';

import cn from '../../src/cn';

import './demo.css';

@cn('demo')
class Demo extends React.Component {
    state = {
        notification1: false,
        notification2: false,
        notification3: false,
        notification4: false,
        notification5: false,
        notification6: false,
        notification7: false,
        notification8: false
    };

    render(cn) {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('1') }>1</Button>
                                <Notification
                                    visible={ this.state.notification1 }
                                    status='ok'
                                    offset={ 10 }
                                    title={ 'Message title' }
                                    onCloseTimeout={ () => { this.setState({ notification1: false }); } }
                                    onCloserClick={ () => { this.setState({ notification1: false }); } }
                                >
                                    Something went right
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('2') }>2</Button>
                                <Notification
                                    visible={ this.state.notification2 }
                                    status='fail'
                                    offset={ 100 }
                                    stickTo='right'
                                    onCloseTimeout={ () => { this.setState({ notification2: false }); } }
                                    onCloserClick={ () => { this.setState({ notification2: false }); } }
                                >
                                    Something went wrong
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('3') }>3</Button>
                                <Notification
                                    visible={ this.state.notification3 }
                                    status='error'
                                    offset={ 190 }
                                    onCloseTimeout={ () => { this.setState({ notification3: false }); } }
                                    onCloserClick={ () => { this.setState({ notification3: false }); } }
                                >
                                    Error
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('4') }>4</Button>
                                <Notification
                                    visible={ this.state.notification4 }
                                    status='ok'
                                    stickTo='right'
                                    offset={ 280 }
                                    onCloseTimeout={ () => { this.setState({ notification4: false }); } }
                                    onCloserClick={ () => { this.setState({ notification4: false }); } }
                                >
                                    { 'I\'m right' }
                                </Notification>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('5') }>1</Button>
                                <Notification
                                    visible={ this.state.notification5 }
                                    status='ok'
                                    offset={ 10 }
                                    onCloseTimeout={ () => { this.setState({ notification5: false }); } }
                                    onCloserClick={ () => { this.setState({ notification5: false }); } }
                                >
                                    Something went right
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('6') }>2</Button>
                                <Notification
                                    visible={ this.state.notification6 }
                                    status='fail'
                                    stickTo='right'
                                    offset={ 100 }
                                    outsideClickClosable={ true }
                                    onClickOutside={ () => { this.setState({ notification6: false }); } }
                                    onCloserClick={ () => { this.setState({ notification6: false }); } }
                                >
                                    <div>Something went wrong</div>
                                    <div>Закрываюсь по клику вне себя</div>
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('7') }>3</Button>
                                <Notification
                                    visible={ this.state.notification7 }
                                    status='error'
                                    stickTo='right'
                                    offset={ 190 }
                                    onCloseTimeout={ () => { this.setState({ notification7: false }); } }
                                    onCloserClick={ () => { this.setState({ notification7: false }); } }
                                >
                                    Error
                                </Notification>
                            </div>
                            <div className={ cn('button-layout') }>
                                <Button onClick={ () => this.handleNotification('8') }>custom</Button>
                                <Notification
                                    visible={ this.state.notification8 }
                                    icon={ <Icon icon='search' theme='alfa-on-color' size='m' /> }
                                    status='ok'
                                    offset={ 10 }
                                    onCloseTimeout={ () => { this.setState({ notification8: false }); } }
                                    onCloserClick={ () => { this.setState({ notification8: false }); } }
                                >
                                    Something went in special way
                                </Notification>
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    handleNotification(name) {
        this.setState({ [`notification${name}`]: !this.state[`notification${name}`] });
    }
}

export default Demo;
