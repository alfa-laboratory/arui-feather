/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';

import FlagIcon from '../flag-icon/flag-icon';
import Input from '../input/input';
import Select from '../select/select';

import cn from '../cn';
import performance from '../performance';

import countries from '../lib/countries';

function getRelatedTarget(event) {
    return event.relatedTarget || // не поддерживается в FF и IE10 https://github.com/facebook/react/issues/2011
        event.explicitOriginalTarget || // не поддерживается в IE
        document.activeElement; // В IE вернет не <Select> а конкретную ноду, на которую пришел фокус
}

/**
 * Компонент ввода международного телефона по маске.
 *
 */
@cn('intl-phone-input', Input, Select)
@performance()
class IntlPhoneInput extends React.Component {
    static propTypes = {
        ...Input.propTypes
    };

    static defaultProps = {
        size: 'm',
        value: '+7'
    };

    state = {
        countryIso2: 'ru',
        inputFocused: false,
        inputValue: this.props.value,
        selectFocused: false,
        onceOpened: false
    }

    countries;
    input;
    select;
    timeoutId;
    util;

    componentDidMount() {
        this.loadUtil();
        this.setCountryFromValue();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.inputValue !== nextState.inputValue) {
            if (this.props.onChange) {
                this.props.onChange(nextState.inputValue);
            }
        }
    }

    componentWillUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }

    render(cn, Input, Select) {
        let offset;

        switch (this.props.size) {
            case 's': offset = -22; break;
            case 'm': offset = -28; break;
            case 'l': offset = -33; break;
            case 'xl': offset = -38; break;
        }

        return (
            <div className={ cn() }>
                <Input
                    className={ cn('input') }
                    ref={ (input) => { this.input = input; } }
                    { ...this.props }
                    focused={ this.state.inputFocused || this.state.selectFocused }
                    leftAddons={
                        <Select
                            className={ cn('select') }
                            ref={ (select) => { this.select = select; } }
                            disabled={ this.props.disabled }
                            mode='radio'
                            options={ this.getOptions(cn) }
                            popupSecondaryOffset={ offset }
                            renderButtonContent={ this.renderSelectButtonContent }
                            size={ this.props.size }
                            value={ [this.state.countryIso2] }
                            onBlur={ this.handleSelectBlur }
                            onChange={ this.handleSelectChange }
                            onClick={ this.handleSelectClick }
                            onFocus={ this.handleSelectFocus }
                        />
                    }
                    noValidate={ true }
                    type='tel'
                    value={ this.getValue() }
                    onBlur={ this.handleInputBlur }
                    onChange={ this.handleInputChange }
                    onFocus={ this.handleInputFocus }
                />
            </div>
        );
    }

    renderFlagIcon(countryIso2) {
        return (
            <FlagIcon
                country={ countryIso2 }
                mode={ this.state.onceOpened ? 'sprite' : 'chunk' }
                size={ this.props.size }
            />
        );
    }

    @autobind
    renderSelectButtonContent() {
        return this.renderFlagIcon(this.state.countryIso2);
    }

    @autobind
    handleSelectFocus(event) {
        if (!this.state.onceOpened) {
            this.setState({
                onceOpened: true
            });
        }

        this.resolveFocusedState({ selectFocused: true }, event);
    }

    @autobind
    handleSelectBlur(event) {
        this.resolveFocusedState({ selectFocused: false }, event);
    }

    @autobind
    handleSelectChange(value) {
        let inputValue = `+${this.countries.find(country => country.iso2 === value[0]).dialCode}`;

        this.setState({
            countryIso2: value[0],
            inputValue
        }, () => {
            // Wait for select blur, then focus on input
            this.timeoutId = setTimeout(() => {
                this.input.focus();
                this.input.setSelectionRange(inputValue.length);
            }, 0);
        });
    }

    @autobind
    handleSelectClick() {
        // Set focus to input on select button toggle
        if (this.state.selectFocused) {
            this.input.focus();
            this.input.setSelectionRange(-1);
        }
    }

    @autobind
    handleInputFocus(event) {
        this.resolveFocusedState({ inputFocused: true }, event);
    }

    @autobind
    handleInputBlur(event) {
        this.resolveFocusedState({ inputFocused: false }, event);
    }

    @autobind
    handleInputChange(value) {
        this.setState({
            inputValue: value.length === 1 && value !== '+' ? `+${value}` : value
        }, this.setCountryFromValue);
    }

    @autobind
    getOptions(cn) {
        this.countries = countries.getCountries();

        return this.countries.map(country => ({
            value: country.iso2,
            text: (
                <span>
                    { country.name }
                    <span className={ cn('select-option-code') }>+{ country.dialCode }</span>
                </span>
            ),
            icon: (
                <span className={ cn('select-option-flag') }>
                    { this.renderFlagIcon(country.iso2) }
                </span>
            )
        }));
    }

    getValue() {
        return this.props.value || this.state.inputValue;
    }

    loadUtil() {
        return import(/* webpackChunkName: "libphonenumber" */ 'libphonenumber-js/bundle/libphonenumber-js.min')
            .then((util) => { this.util = util; })
            .catch(error => `An error occurred while loading libphonenumber-js:\n${error}`);
    }

    resolveFocusedState(nextFocusedStateItem, event) {
        let focusedState = {
            inputFocused: this.state.inputFocused,
            selectFocused: this.state.selectFocused
        };

        let relatedTarget = getRelatedTarget(event);
        let hasMatchedRelatedTarget = relatedTarget === event.target;
        // Check classNames matching in popup's button (relatedTarget) & menu (focused target)
        let hasSelectRelatedTarget = Array.from(relatedTarget.classList).some(item => /select/.test(item)) ===
            Array.from(event.target.classList).some(item => /select/.test(item));

        if (event.type === 'focus') {
            if (hasMatchedRelatedTarget || hasSelectRelatedTarget) {
                // If we have smth already focused, do not do anything
                let alreadyInFocus = Object.values(focusedState).some(item => item);

                if (!alreadyInFocus) {
                    this.setState(nextFocusedStateItem);

                    if (this.props.onFocus) {
                        this.props.onFocus(event);
                    }
                }
            }
        }

        if (event.type === 'blur') {
            if (relatedTarget === document.body) {
                // Set all values in focusedState to false cause we are blurring now
                this.setState(
                    Object.keys(focusedState).reduce((result, item) => {
                        result[item] = false;
                        return result;
                    }, {})
                );

                if (this.props.onBlur) {
                    this.props.onBlur(event);
                }
            }
        }
    }

    setCountryFromValue() {
        let inputValue = this.getValue().replace(/ /g, '');

        this.countries.forEach((country) => {
            if (new RegExp(`^\\+${country.dialCode}`).test(inputValue)) {
                if (country.priority !== undefined) {
                    if (inputValue.length <= 3) {
                        // Handle country change with input change & set highest by priority
                        if (this.state.countryIso2 !== country.iso2 && country.priority === 0) {
                            this.setCountry(country.iso2, inputValue);
                        }
                    // Otherwise don't change country already selected country
                    } else if (this.state.countryIso2 === country.iso2) {
                        this.setCountry(country.iso2, inputValue);
                    }
                } else {
                    this.setCountry(country.iso2, inputValue);
                }
            }
        });
    }

    setCountry(countryIso2, inputValue) {
        let resultValue = this.util
            ? new this.util.asYouType(countryIso2.toUpperCase()).input(inputValue) // eslint-disable-line new-cap
            : inputValue;

        this.setState({
            inputValue: resultValue,
            countryIso2
        });
    }

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.input.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        this.input.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.input.scrollTo();
    }
}

export default IntlPhoneInput;
