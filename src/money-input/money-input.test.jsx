/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { SCROLL_TO_CORRECTION } from '../vars';

import MoneyInput from './money-input';

describe('money-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let moneyInput = shallow(<MoneyInput />);

        expect(moneyInput).toMatchSnapshot();
    });

    it('should call input focus method on `focus()` call', () => {
        let moneyInput = mount(<MoneyInput />);
        let input = moneyInput.instance().root;

        jest.spyOn(input, 'focus');

        moneyInput.instance().focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should call input blur method on `blur()` call', () => {
        let moneyInput = mount(<MoneyInput />);
        let input = moneyInput.instance().root;

        jest.spyOn(input, 'blur');

        moneyInput.instance().blur();

        expect(input.blur).toHaveBeenCalled();
    });

    it('should format input value passed with props', () => {
        let moneyInput = mount(<MoneyInput value='1234,567' />);
        let controlNode = moneyInput.find('input');

        expect(controlNode.prop('value')).toBe('1 234,56');
    });

    it('should format fraction part of input value when fractionLength is 4', () => {
        let moneyInput = mount(<MoneyInput value='1234,56789' fractionLength={ 4 } />);
        let controlNode = moneyInput.find('input');

        expect(controlNode.prop('value')).toBe('1 234,5678');
    });

    it('should call `onChange` callback after input was changed', () => {
        let onChange = jest.fn();
        let moneyInput = mount(<MoneyInput onChange={ onChange } />);
        let controlNode = moneyInput.find('input');

        controlNode.simulate('change');

        expect(onChange).toHaveBeenCalled();
    });

    it('should call `onChange` with 2 params after input was changed', () => {
        let onChange = jest.fn();
        let moneyInput = mount(<MoneyInput onChange={ onChange } />);
        let controlNode = moneyInput.find('input');

        controlNode.simulate('change', { target: { value: '1 234 567,89' } });

        expect(onChange).toHaveBeenCalledWith('1 234 567,89', 1234567.89);
    });

    it('should scroll window to element on public scrollTo method', () => {
        let moneyInput = mount(<MoneyInput />);
        let elemTopPosition = moneyInput.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        moneyInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should format new value received in props', () => {
        let moneyInput = mount(<MoneyInput value='' />);

        moneyInput.setProps({ value: '1234,567' });

        expect(moneyInput.find('input').prop('value')).toBe('1 234,56');
    });
});
