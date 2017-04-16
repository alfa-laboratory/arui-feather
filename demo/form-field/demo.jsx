import React from 'react';
import AppContent from '../../src/app-content/app-content';
import DemoSection from '../demo-section';
import FormField from '../../src/form-field/form-field';
import Input from '../../src/input/input';
import Label from '../../src/label/label';
import Radio from '../../src/radio/radio';
import RadioGroup from '../../src/radio-group/radio-group';
import Checkbox from '../../src/checkbox/checkbox';
import CheckboxGroup from '../../src/checkbox-group/checkbox-group';
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
                                label={ <Label size='s'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='s' />
                            </FormField>
                            <FormField
                                size='m'
                                label={ <Label size='m'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='m' />
                            </FormField>
                            <FormField
                                size='l'
                                label={ <Label size='l'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='l' />
                            </FormField>
                            <FormField
                                size='xl'
                                label={ <Label size='xl'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='xl' />
                            </FormField>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <div>
                            <FormField
                                size='s'
                                label={ <Label size='s'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='s' />
                            </FormField>
                            <FormField
                                size='m'
                                label={ <Label size='m'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='m' />
                            </FormField>
                            <FormField
                                size='l'
                                label={ <Label size='l'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='l' />
                            </FormField>
                            <FormField
                                size='xl'
                                label={ <Label size='xl'>Label...</Label> }
                            >
                                <Input placeholder='Input...' size='xl' />
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
                                    <Label size='s'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='s' />
                            </FormField>
                            <FormField
                                size='m'
                                view='line'
                                label={
                                    <Label size='m'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='m' />
                            </FormField>
                            <FormField
                                size='l'
                                view='line'
                                label={
                                    <Label size='l'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='l' />
                            </FormField>
                            <FormField
                                size='xl'
                                view='line'
                                label={
                                    <Label size='xl'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='xl' />
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
                                    <Label size='s'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='s' />
                            </FormField>
                            <FormField
                                size='m'
                                view='line'
                                label={
                                    <Label size='m'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='m' />
                            </FormField>
                            <FormField
                                size='l'
                                view='line'
                                label={
                                    <Label size='l'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='l' />
                            </FormField>
                            <FormField
                                size='xl'
                                view='line'
                                label={
                                    <Label size='xl'>Label...</Label>
                                }
                            >
                                <Input placeholder='Input...' size='xl' />
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <AppContent>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <RadioGroup size='m' type='normal'>
                                    <Radio size='m' text='radio 1' value='radio-1' />
                                    <Radio size='m' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <RadioGroup size='l' type='normal'>
                                    <Radio size='l' text='radio 1' value='radio-1' />
                                    <Radio size='l' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='s' view='line' label={ <Label size='s'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='s' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='s' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='m' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='m' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='l' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='l' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='xl' view='line' label={ <Label size='xl'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='xl' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='xl' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <AppContent>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <RadioGroup type='normal'>
                                    <Radio size='m' text='radio 1' value='radio-1' />
                                    <Radio size='m' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <RadioGroup type='normal'>
                                    <Radio size='l' text='radio 1' value='radio-1' />
                                    <Radio size='l' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='s' view='line' label={ <Label size='s'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='s' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='s' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='m' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='m' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='l' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='l' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                            <FormField size='xl' view='line' label={ <Label size='xl'>Label...</Label> }>
                                <RadioGroup type='button'>
                                    <Radio type='button' size='xl' text='radio 1' value='radio-1' />
                                    <Radio type='button' size='xl' text='radio 2' value='radio-2' />
                                </RadioGroup>
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-white'>
                    <ThemeProvider theme='alfa-on-color'>
                        <AppContent>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <CheckboxGroup type='normal'>
                                    <Checkbox size='m' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox size='m' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <CheckboxGroup type='normal'>
                                    <Checkbox size='l' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox size='l' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='s' view='line' label={ <Label size='s'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='s' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='s' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='m' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='m' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='l' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='l' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='xl' view='line' label={ <Label size='xl'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='xl' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='xl' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <AppContent>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <CheckboxGroup type='normal'>
                                    <Checkbox size='m' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox size='m' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <CheckboxGroup type='normal'>
                                    <Checkbox size='l' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox size='l' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='s' view='line' label={ <Label size='s'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='s' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='s' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='m' view='line' label={ <Label size='m'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='m' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='m' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='l' view='line' label={ <Label size='l'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='l' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='l' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                            <FormField size='xl' view='line' label={ <Label size='xl'>Label...</Label> }>
                                <CheckboxGroup type='button'>
                                    <Checkbox type='button' size='xl' text='checkbox 1' value='checkbox-1' />
                                    <Checkbox type='button' size='xl' text='checkbox 2' value='checkbox-2' />
                                </CheckboxGroup>
                            </FormField>
                        </AppContent>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }
}

export default Demo;
