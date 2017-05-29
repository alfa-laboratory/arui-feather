import React from 'react';
import { autobind } from 'core-decorators';

import CalendarInput from '../../src/calendar-input';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider';

import './demo.css';

class Demo extends React.Component {
    state = {
        date10: '01.02.2016',
        date11: '01.02.2016',
        date12: '01.02.2016',
        date13: '01.02.2016',
        date20: '01.02.2016',
        date21: '01.02.2016',
        date22: '01.02.2016',
        date23: '01.02.2016'
    };

    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <CalendarInput size='s' />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='m'
                                    value={ this.state.date11 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'date11') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date11') }
                                />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='l'
                                    value={ this.state.date12 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'date12') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date12') }
                                />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='xl'
                                    value={ this.state.date13 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'date13') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date13') }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <CalendarInput size='s' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='m' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='l' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='xl' error='Something went wrong' />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout-box'>
                                <CalendarInput size='s' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='m' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='l' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='xl' width='available' />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <CalendarInput size='s' />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='m'
                                    value={ this.state.date21 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'data21') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date21') }
                                />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='l'
                                    value={ this.state.date22 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'date22') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date22') }
                                />
                            </div>
                            <div className='layout'>
                                <CalendarInput
                                    size='xl'
                                    value={ this.state.date23 }
                                    onInputChange={ value => this.handleCalendarChange(value, 'date23') }
                                    onCalendarChange={ value => this.handleCalendarChange(value, 'date23') }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout'>
                                <CalendarInput size='s' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='m' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='l' error='Something went wrong' />
                            </div>
                            <div className='layout'>
                                <CalendarInput size='xl' error='Something went wrong' />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <div className='layout-box'>
                                <CalendarInput size='s' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='m' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='l' width='available' />
                            </div>
                            <div className='layout-box'>
                                <CalendarInput size='xl' width='available' />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleCalendarChange(value, date) {
        this.setState({
            [date]: value
        });
    }
}

export default Demo;
