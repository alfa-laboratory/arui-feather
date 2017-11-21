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
import getRelatedTarget from '../lib/related-target';

const MAX_DIAL_CODE_LENGTH = 4;

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
        this.setCountry();
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
                            popupSecondaryOffset={ this.getSelectPopupOffset() }
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
        // Set focus to input on select closing by it's button toggle
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
        }, this.setCountry);
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
            nativeText: `${country.name} +${country.dialCode}`,
            icon: (
                <span className={ cn('select-option-flag') }>
                    { this.renderFlagIcon(country.iso2) }
                </span>
            )
        }));
    }

    getSelectPopupOffset() {
        switch (this.props.size) {
            case 's': return -22;
            case 'm': return -28;
            case 'l': return -33;
            case 'xl': return -38;
        }

        return 0;
    }

    getValue() {
        // Use value from state not props, cause of some formatting steps in component
        // Sync props.value with state.inputValue in componentWillUpdate
        return this.state.inputValue;
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
        let hasSelectRelatedTarget = false;

        // Check classNames matching in select's button (relatedTarget) & menu (focused target)
        if (relatedTarget.classList && event.target.classList) {
            hasSelectRelatedTarget = Array.from(relatedTarget.classList).some(item => /select/.test(item)) ===
                Array.from(event.target.classList).some(item => /select/.test(item));
        }

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

    setCountry() {
        let inputValue = this.getValue().replace(/ /g, '');

        this.countries.forEach((country) => {
            if (new RegExp(`^\\+${country.dialCode}`).test(inputValue)) {
                // Handle countries with priority field
                if (country.priority !== undefined) {
                    // Check max dial code length to allow country change
                    // For countries with identical dial codes or North American Numbering Plan (NANP)
                    if (inputValue.length < MAX_DIAL_CODE_LENGTH) {
                        // Handle country change with input change & set highest by priority
                        if (this.state.countryIso2 !== country.iso2 && country.priority === 0) {
                            this.setValue(country.iso2, inputValue);
                        }
                    // Otherwise don't change already selected country, just set value
                    } else if (this.state.countryIso2 === country.iso2) {
                        this.setValue(country.iso2, inputValue);
                    }
                // Handle all other countries
                } else {
                    this.setValue(country.iso2, inputValue);
                }
            }
        });
    }

    setValue(countryIso2, inputValue) {
        let resultValue = this.util
            ? new this.util.asYouType(countryIso2.toUpperCase()).input(inputValue) // eslint-disable-line new-cap
            : inputValue;

        this.setState({
            inputValue: resultValue,
            countryIso2
        });
    }

    /**
     * Возвращает ссылку на HTMLElement инпута.
     *
     * @public
     * @returns {HTMLInputElement}
     */
    getControl() {
        return this.input.getControl();
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
