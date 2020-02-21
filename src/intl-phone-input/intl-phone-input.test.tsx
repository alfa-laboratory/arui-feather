/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { IntlPhoneInput } from './intl-phone-input';
import { SCROLL_TO_CORRECTION } from '../vars';

const SIZES = ['s', 'm', 'l', 'xl'] as const;

describe('intl-phone-input', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('renders without problems', () => {
        const intlPhoneInput = shallow(<IntlPhoneInput />);

        expect(intlPhoneInput).toMatchSnapshot();
    });

    it('renders without problems in all sizes', () => {
        SIZES.forEach((size) => {
            const intlPhoneInput = shallow(<IntlPhoneInput size={ size } />);

            expect(intlPhoneInput).toMatchSnapshot(`size = ${size}`);
        });
    });

    it('should return `HTMLInputElement` when `getControl` method called', () => {
        const elem = mount<IntlPhoneInput>(<IntlPhoneInput />);
        const controlNode = elem.instance().getControl();

        expect(controlNode).toBeInstanceOf(HTMLInputElement);
    });

    it('should call `onFocus` callback on input focus', () => {
        const onFocus = jest.fn();
        const elem = mount(<IntlPhoneInput onFocus={ onFocus } />);

        elem.find('input[type="tel"]').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` on input blur', () => {
        const onBlur = jest.fn();
        const elem = mount(<IntlPhoneInput onBlur={ onBlur } />);

        elem.find('input[type="tel"]').simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should scroll window to element on public `scrollTo` method', () => {
        const elem = mount<IntlPhoneInput>(<IntlPhoneInput />);
        const elemTopPosition = elem.instance().input.getNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        elem.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call `onChange` callback after input was changed with dial code of country without priority', () => {
        const onChange = jest.fn();
        const elem = mount(<IntlPhoneInput onChange={ onChange } />);

        elem.find('input[type="tel"]').simulate('change', { target: { value: '+54' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+54');
    });

    it('should call `onChange` callback after input was changed with dial code of country from NANP', () => {
        const onChange = jest.fn();
        const elem = mount(<IntlPhoneInput onChange={ onChange } />);

        elem.find('input[type="tel"]').simulate('change', { target: { value: '+1868' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+1868');
    });

    it('should call `onChange` callback after input was changed with whole russian number', () => {
        const onChange = jest.fn();
        const elem = mount(<IntlPhoneInput onChange={ onChange } />);

        elem.find('input[type="tel"]').simulate('change', { target: { value: '+74957888878' } });

        expect(onChange).toHaveBeenCalled();
        expect(onChange).toHaveBeenCalledWith('+74957888878');
    });

    it('should have default country flag icon', () => {
        const elem = mount(<IntlPhoneInput />);

        expect(elem.find('.flag-icon').props().className).toContain('flag-icon_country_ru');
    });

    it('should set new country flag icon from props', () => {
        const elem = mount(<IntlPhoneInput value='+61' />);

        expect(elem.find('.flag-icon').props().className).toContain('flag-icon_country_au');
    });

    it('should call loadUtil method on componentDidMount', () => {
        const instance = mount<IntlPhoneInput>(<IntlPhoneInput />).instance();

        jest.spyOn(instance, 'loadUtil');
        instance.componentDidMount();
        expect(instance.loadUtil).toHaveBeenCalled();
    });

    describe('getOptions method', () => {
        const elem = mount<IntlPhoneInput>(<IntlPhoneInput />);

        it('should return array with zero length if state.onceOpened is falsy', () => {
            elem.setState({ onceOpened: false });
            expect(elem.instance().getOptions().length).toBe(0);
        });

        it('should return array with countries length if state.onceOpened is truly', () => {
            elem.setState({ onceOpened: true });
            expect(elem.instance().getOptions().length).toBe(243);
        });
    });

    it('should call `onChange` callback after select was changed', () => {
        const onChange = jest.fn();

        const wrapper = mount(<IntlPhoneInput onChange={ onChange } />);

        wrapper.setState({ onceOpened: true });

        const firstOptionNode = wrapper.find('.popup .menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    it('should focus on input after select was changed', (done) => {
        const elem = mount<IntlPhoneInput>(<IntlPhoneInput />);

        elem.setState({ onceOpened: true });
        const controlNode = elem.instance().input;

        jest.spyOn(controlNode, 'focus');
        const popupNode = elem.find('.popup');
        const firstOptionNode = popupNode.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        setTimeout(() => {
            expect(controlNode.focus).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should focus on input after select was closed by button toggle', () => {
        const elem = mount<IntlPhoneInput>(<IntlPhoneInput />);
        const selectButtonNode = elem.find('.select-button');
        const controlNode = elem.instance().input;

        jest.spyOn(controlNode, 'focus');

        elem.setState({ selectFocused: true });
        selectButtonNode.simulate('click');

        expect(controlNode.focus).toHaveBeenCalled();
    });
});
