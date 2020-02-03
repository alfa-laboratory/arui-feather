/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { EmailInput } from './email-input';
import { SCROLL_TO_CORRECTION } from '../vars';

describe('email-input', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        const emailInput = shallow<EmailInput>(<EmailInput />);

        expect(emailInput).toMatchSnapshot();
    });

    it('should scroll window to element on public scrollTo method', () => {
        const emailInput = mount<EmailInput>(<EmailInput />);
        const elemTopPosition = emailInput.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        emailInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call input focus/blur methods on public focus/blur methods', () => {
        const emailInput = mount<EmailInput>(<EmailInput />);

        const input = emailInput.instance().root;

        jest.spyOn(input, 'focus');
        jest.spyOn(input, 'blur');

        emailInput.instance().focus();
        expect(input.focus).toHaveBeenCalled();

        emailInput.instance().blur();
        expect(input.blur).toHaveBeenCalled();
    });
});
