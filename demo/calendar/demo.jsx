import React from 'react';
import addDays from 'date-fns/add_days';
import startOfDay from 'date-fns/start_of_day';
import subtractDays from 'date-fns/sub_days';

import Calendar from '../../src/calendar';
import DemoSection from '../demo-section';
import ThemeProvider from '../../src/theme-provider';

import './demo.css';

const now = Date.now();

class Demo extends React.Component {
    state = {
        date1: now,
        date2: now,
        date3: now,
        date4: now,
        date5: now,
        date6: now,
        earlierLimit: subtractDays(new Date(now), 3).valueOf(),
        laterLimit: addDays(new Date(now), 1).valueOf()
    };

    render() {
        const offDays = [subtractDays(new Date(now), 2), addDays(new Date(now), 2)]
            .map(date => startOfDay(date).valueOf());

        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className='layout'>
                                <Calendar
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date1: newDate
                                        });
                                    } }
                                    value={ this.state.date1 }
                                />
                            </div>
                            <div className='layout'>
                                <Calendar
                                    value={ this.state.date2 }
                                    earlierLimit={ this.state.earlierLimit }
                                    laterLimit={ this.state.laterLimit }
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date2: newDate
                                        });
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Calendar
                                    value={ this.state.date3 }
                                    offDays={ offDays }
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date3: newDate
                                        });
                                    } }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <dv>
                            <div className='layout'>
                                <Calendar
                                    value={ this.state.date4 }
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date4: newDate
                                        });
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Calendar
                                    value={ this.state.date5 }
                                    earlierLimit={ this.state.earlierLimit }
                                    laterLimit={ this.state.laterLimit }
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date5: newDate
                                        });
                                    } }
                                />
                            </div>
                            <div className='layout'>
                                <Calendar
                                    value={ this.state.date6 }
                                    offDays={ offDays }
                                    onValueChange={ (newDate) => {
                                        this.setState({
                                            date6: newDate
                                        });
                                    } }
                                />
                            </div>
                        </dv>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
