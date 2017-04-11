import React from 'react';
import AppContent from '../../src/app-content/app-content';
import DemoSection from '../demo-section';
import FormField from '../../src/form-field/form-field';
import Input from '../../src/input/input';
import Label from '../../src/label/label';
import ThemeProvider from '../../src/theme-provider/theme-provider';

import cn from '../../src/cn';

@cn('demo')
class Demo extends React.Component {
    render(cn) {
        return (
            <div className={ cn }>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <FormField
                                size='s'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='m'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='l'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='xl'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <FormField
                                size='s'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='m'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='l'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='xl'
                                label='Label...'
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <AppContent>
                            <FormField
                                size='s'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='m'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='l'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='xl'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <AppContent>
                            <FormField
                                size='s'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='m'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='l'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                            <FormField
                                size='xl'
                                view='line'
                                label={
                                    <Label>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' />
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
