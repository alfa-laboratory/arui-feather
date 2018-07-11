/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import PhoneInput from './phone-input';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('phone-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should scroll window to element on public scrollTo method', () => {
        let phoneInput = mount(<PhoneInput />);
        let elemTopPosition = phoneInput.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        phoneInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call input focus/blur methods on public focus/blur methods', () => {
        let phoneInput = mount(<PhoneInput />);

        let input = phoneInput.instance().root;
        jest.spyOn(input, 'focus');
        jest.spyOn(input, 'blur');


        phoneInput.instance().focus();
        expect(input.focus).toHaveBeenCalled();

        phoneInput.instance().blur();
        expect(input.blur).toHaveBeenCalled();
    });
});
