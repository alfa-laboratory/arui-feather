import React from 'react';
import Button from '../../src/button';
import DemoSection from '../demo-section';
import Form from '../../src/form';
import FormField from '../../src/form-field';
import Input from '../../src/input';
import ThemeProvider from '../../src/theme-provider';

/* eslint no-alert: 0 */
class Demo extends React.Component {
    render() {
        return (
            <div>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Form onSubmit={ function () { alert('submit 1'); } }>
                                <FormField label='Инпут'>
                                    <Input placeholder='Input...' />
                                </FormField>
                                <FormField>
                                    <Button type='submit'>Button</Button>
                                </FormField>
                            </Form>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <Form view='line' onSubmit={ function () { alert('submit 2'); } } footer='Form footer'>
                                <FormField label='Инпут'>
                                    <Input placeholder='Input...' />
                                </FormField>
                                <FormField>
                                    <Button type='submit'>Button</Button>
                                </FormField>
                            </Form>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Form onSubmit={ function () { alert('submit 3'); } }>
                                <FormField label='Инпут'>
                                    <Input placeholder='Input...' />
                                </FormField>
                                <FormField>
                                    <Button type='submit'>Button</Button>
                                </FormField>
                            </Form>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <Form view='line' onSubmit={ function () { alert('submit 4'); } } footer='Form footer'>
                                <FormField label='Инпут'>
                                    <Input placeholder='Input...' />
                                </FormField>
                                <FormField>
                                    <Button type='submit'>Button</Button>
                                </FormField>
                            </Form>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
