import React from 'react';
import DemoSection from '../demo-section';
import Radio from '../../src/radio';
import RadioGroup from '../../src/radio-group';
import ThemeProvider from '../../src/theme-provider';

const RADIOS_1 = [
    { text: 'Один', value: 'radio-1-1' },
    { text: 'Два', value: 'radio-1-2' },
    { text: 'Три', value: 'radio-1-3' },
    { text: 'Четыре', value: 'radio-1-4' }
];
const RADIOS_2 = [
    { text: 'Один', value: 'radio-2-1' },
    { text: 'Два', value: 'radio-2-2' },
    { text: 'Три', value: 'radio-2-3' },
    { text: 'Четыре', value: 'radio-2-4' }
];
const RADIOS_3 = [
    { text: 'Один', value: 'radio-3-1' },
    { text: 'Два', value: 'radio-3-2' },
    { text: 'Три', value: 'radio-3-3' },
    { text: 'Четыре', value: 'radio-3-4' }
];
const RADIOS_4 = [
    { text: 'Один', value: 'radio-4-1' },
    { text: 'Два', value: 'radio-4-2' },
    { text: 'Три', value: 'radio-4-3' },
    { text: 'Четыре', value: 'radio-4-4' }
];
const RADIOS_5 = [
    { text: 'Один', value: 'radio-5-1' },
    { text: 'Два', value: 'radio-5-2' },
    { text: 'Три', value: 'radio-5-3' },
    { text: 'Четыре', value: 'radio-5-4' }
];
const RADIOS_6 = [
    { text: 'Один', value: 'radio-6-1' },
    { text: 'Два', value: 'radio-6-2' },
    { text: 'Три', value: 'radio-6-3' },
    { text: 'Четыре', value: 'radio-6-4' }
];
const RADIOS_7 = [
    { text: 'Один', value: 'radio-7-1' },
    { text: 'Два', value: 'radio-7-2' },
    { text: 'Три', value: 'radio-7-3' },
    { text: 'Четыре', value: 'radio-7-4' }
];
const RADIOS_8 = [
    { text: 'Один', value: 'radio-8-1' },
    { text: 'Два', value: 'radio-8-2' },
    { text: 'Три', value: 'radio-8-3' },
    { text: 'Четыре', value: 'radio-8-4' }
];
const RADIOS_9 = [
    { text: 'Один', value: 'radio-9-1' },
    { text: 'Два', value: 'radio-9-2' },
    { text: 'Три', value: 'radio-9-3' },
    { text: 'Четыре', value: 'radio-9-4' }
];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <RadioGroup>
                            { RADIOS_1.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <RadioGroup error='Обязательно'>
                            { RADIOS_2.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <RadioGroup type='button' error={ 'Обязательно' }>
                            { RADIOS_3.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                    type='button'
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <RadioGroup type='line'>
                            { RADIOS_4.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <RadioGroup>
                            { RADIOS_5.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <RadioGroup error='Обязательно'>
                            { RADIOS_6.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <RadioGroup type='button'>
                            { RADIOS_7.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                    type='button'
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <RadioGroup type='button' width='available'>
                            { RADIOS_8.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                    type='button'
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <RadioGroup type='line'>
                            { RADIOS_9.map(radio =>
                                <Radio
                                    text={ radio.text }
                                    key={ radio.value }
                                    value={ radio.value }
                                />
                            ) }
                        </RadioGroup>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
