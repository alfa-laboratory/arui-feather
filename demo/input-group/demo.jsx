import React from 'react';
import DemoSection from '../demo-section';
import Input from '../../src/input';
import InputGroup from '../../src/input-group';
import ThemeProvider from '../../src/theme-provider';

const INPUTS_1 = [
    { key: 'input-1-1' },
    { key: 'input-1-2' }
];
const INPUTS_2 = [
    { key: 'input-2-1' },
    { key: 'input-2-2' },
    { key: 'input-2-3' },
    { key: 'input-2-4' }
];
const INPUTS_3 = [
    { key: 'input-3-1', error: 'Input Error' },
    { key: 'input-3-2', error: 'Input Error' },
    { key: 'input-3-3' },
    { key: 'input-3-4', error: 'Input Error' }
];
const INPUTS_4 = [
    { key: 'input-3-1', error: 'Input Error' },
    { key: 'input-3-2', disabled: true },
    { key: 'input-3-3' },
    { key: 'input-3-4', disabled: true }
];

class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <InputGroup>
                            { INPUTS_1.map(input =>
                                <Input
                                    key={ input.key }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <InputGroup>
                            { INPUTS_1.map(input =>
                                <Input
                                    key={ input.key }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <InputGroup width='available'>
                            { INPUTS_2.map(input =>
                                <Input
                                    key={ input.key }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <InputGroup width='available'>
                            { INPUTS_2.map(input =>
                                <Input
                                    key={ input.key }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <InputGroup>
                            { INPUTS_2.map(input =>
                                <Input
                                    key={ input.key }
                                    placeholder='Input ...'
                                    disabled={ true }
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <InputGroup>
                            { INPUTS_2.map(input =>
                                <Input
                                    key={ input.key }
                                    disabled={ true }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <InputGroup>
                            { INPUTS_3.map(input =>
                                <Input
                                    key={ input.key }
                                    error={ input.error }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <InputGroup>
                            { INPUTS_3.map(input =>
                                <Input
                                    key={ input.key }
                                    error={ input.error }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <InputGroup>
                            { INPUTS_4.map(input =>
                                <Input
                                    key={ input.key }
                                    error={ input.error }
                                    disabled={ input.disabled }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <InputGroup>
                            { INPUTS_4.map(input =>
                                <Input
                                    key={ input.key }
                                    error={ input.error }
                                    disabled={ input.disabled }
                                    placeholder='Input ...'
                                />
                            ) }
                        </InputGroup>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
