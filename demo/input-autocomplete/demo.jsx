import React from 'react';
import { autobind } from 'core-decorators';

import DemoSection from '../demo-section';
import InputAutocomplete from '../../src/input-autocomplete';
import Label from '../../src/label';
import ThemeProvider from '../../src/theme-provider';

import cn from '../../src/cn';

import './demo.css';

const OPTIONS_1 = [
    { value: 'Facebook' },
    { value: 'Twitter' },
    { value: 'LinkedIn' },
    { value: 'Sina Weibo' },
    { value: 'Pinterest' },
    { value: 'VKontakte' },
    { value: 'Instagram' },
    { value: 'Tumblr' },
    { value: 'Flickr' },
    { value: 'Odnoklassniki' },
    { value: 'Renren' },
    { value: 'douban' },
    { value: 'LiveJournal' },
    { value: 'DeviantArt' },
    { value: 'StumbleUpon' },
    { value: 'Myspace' },
    { value: 'Yelp, Inc.' },
    { value: 'Taringa!' },
    { value: 'mixi' },
    { value: 'XING' }
];

const OPTIONS_2 = [
    {
        value: 'VKontakte',
        description: <Label size='l'>вариант - VKontakte</Label>
    },
    {
        value: 'Facebook',
        description: <Label size='l'>вариант - Facebook</Label>
    },
    {
        value: 'Twitter',
        description: <Label size='l'>вариант - Twitter</Label>
    }
];

function getFilteredOptions(optionsList, value) {
    let filteredOptions = [];

    if (!value) {
        return filteredOptions;
    }

    optionsList.forEach((option) => {
        if (option.type === 'group') {
            let groupOptions = getFilteredOptions(option.content, value);

            if (groupOptions.length) {
                filteredOptions.push(
                    Object.assign(
                        {},
                        option,
                        {
                            content: groupOptions
                        }
                    )
                );
            }
        } else {
            let normalOptionValue = option.value.toLowerCase().trim();
            let normalValue = value.toLowerCase().trim();
            if (normalOptionValue !== normalValue && normalOptionValue.indexOf(normalValue) !== -1) {
                filteredOptions.push(option);
            }
        }
    });

    return filteredOptions;
}

@cn('demo')
class Demo extends React.Component {
    state = {
        value: '',
        valueWithDescription: ''
    };

    render(cn) {
        return (
            <div className={ cn }>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className={ cn('layout') }>
                                <InputAutocomplete
                                    size='m'
                                    value={ this.state.value }
                                    onChange={ this.handleChange }
                                    onItemSelect={ this.handleItemSelect }
                                    placeholder='Input...'
                                    options={ getFilteredOptions(OPTIONS_1, this.state.value) }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
                <DemoSection theme='alfa-on-color'>
                    <ThemeProvider theme='alfa-on-white'>
                        <div>
                            <div className={ cn('layout') }>
                                <InputAutocomplete
                                    size='l'
                                    value={ this.state.valueWithDescription }
                                    onChange={ this.handleChangeValueWithDescription }
                                    onItemSelect={ this.handleItemSelectValueWithDescription }
                                    placeholder='Input...'
                                    options={ getFilteredOptions(OPTIONS_2, this.state.valueWithDescription) }
                                />
                            </div>
                        </div>
                    </ThemeProvider>
                </DemoSection>
            </div>
        );
    }

    @autobind
    handleChange(value) {
        this.setState({
            value
        });
    }

    @autobind
    handleChangeValueWithDescription(value) {
        this.setState({
            valueWithDescription: value
        });
    }

    @autobind
    handleItemSelect(item) {
        this.setState({
            value: item.text
        });
    }

    @autobind
    handleItemSelectValueWithDescription(item) {
        this.setState({
            valueWithDescription: item.text
        });
    }
}

export default Demo;
