import React from 'react';
import DemoSection from '../demo-section';
import List from '../../src/list/list';
import ThemeProvider from '../../src/theme-provider/theme-provider';

const ITEMS_OL = [
    {
        key: 'one',
        value: 'One'
    },
    {
        key: 'two',
        value: 'Two'
    },
    {
        key: 'three',
        value: 'Three'
    }
];

const ITEMS_UL = [
    {
        key: 'one',
        value: 'Apple'
    },
    {
        key: 'two',
        value: 'Orange'
    },
    {
        key: 'three',
        value: 'Banana'
    }
];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <List
                                items={ ITEMS_UL }
                            />
                            <List
                                items={ ITEMS_OL }
                                type='ordered'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <List
                                items={ ITEMS_UL }
                            />
                            <List
                                items={ ITEMS_OL }
                                type='ordered'
                            />
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
