/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { SCROLL_TO_CORRECTION } from '../vars';

import { MoneyInput } from './money-input';

describe('money-input', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        const moneyInput = shallow(<MoneyInput />);

        expect(moneyInput).toMatchSnapshot();
    });

    it('should call input focus method on `focus()` call', () => {
        const moneyInput = mount<MoneyInput>(<MoneyInput />);
        const input = moneyInput.instance().root;

        jest.spyOn(input, 'focus');

        moneyInput.instance().focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should call input blur method on `blur()` call', () => {
        const moneyInput = mount<MoneyInput>(<MoneyInput />);
        const input = moneyInput.instance().root;

        jest.spyOn(input, 'blur');

        moneyInput.instance().blur();

        expect(input.blur).toHaveBeenCalled();
    });

    it('should format input value passed with props', () => {
        const moneyInput = mount(<MoneyInput value="1234,567" />);
        const controlNode = moneyInput.find('input');

        expect(controlNode.prop('value')).toBe('1 234,56');
    });

    it('should format fraction part of input value when fractionLength is 4', () => {
        const moneyInput = mount(<MoneyInput value="1234,56789" fractionLength={ 4 } />);
        const controlNode = moneyInput.find('input');

        expect(controlNode.prop('value')).toBe('1 234,5678');
    });

    it('should call `onChange` callback after input was changed', () => {
        const onChange = jest.fn();
        const moneyInput = mount(<MoneyInput onChange={ onChange } />);
        const controlNode = moneyInput.find('input');

        controlNode.simulate('change');

        expect(onChange).toHaveBeenCalled();
    });

    it('should call `onChange` with 2 params after input was changed', () => {
        const onChange = jest.fn();
        const moneyInput = mount(<MoneyInput onChange={ onChange } />);
        const controlNode = moneyInput.find('input');

        controlNode.simulate('change', { target: { value: '1 234 567,89' } });

        expect(onChange).toHaveBeenCalledWith('1 234 567,89', 1234567.89);
    });

    it('should scroll window to element on public scrollTo method', () => {
        const moneyInput = mount<MoneyInput>(<MoneyInput />);
        const elemTopPosition = moneyInput.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        moneyInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should format new value received in props', () => {
        const moneyInput = mount(<MoneyInput value="" />);

        moneyInput.setProps({ value: '1234,567' });

        expect(moneyInput.find('input').prop('value')).toBe('1 234,56');
    });

    it('should stay caret before comma', (done) => {
        const moneyInput = mount<MoneyInput>(<MoneyInput value="12,34" />);
        const inputNode = moneyInput.find('input');

        setTimeout(() => {
            jest.useFakeTimers();

            inputNode.getDOMNode<HTMLInputElement>().selectionStart = 3;
            inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 3;

            inputNode.simulate('beforeInput');
            inputNode.simulate('input', { target: { value: '123,34' } });
            jest.runAllTimers();

            expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(3);
            expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(3);
            done();
        }, 0);
    });

    it('should use placeholder as currency spacer if value is empty', () => {
        const moneyInput = mount(<MoneyInput placeholder="placeholder" showCurrency={ true } />);
        const spacerValue = moneyInput.find('.money-input__value').text();

        expect(spacerValue).toBe('placeholder');
    });

    it('should format currency spacer the same way as value', () => {
        const moneyInput = mount(<MoneyInput value="1234,567" showCurrency={ true } />);

        const inputValue = moneyInput.find('input').prop('value');
        const spacerValue = moneyInput.find('.money-input__value').text();

        expect(spacerValue).toBe(inputValue);
    });
});
