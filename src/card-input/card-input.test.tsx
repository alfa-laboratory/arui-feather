/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { CardInput } from './card-input';
import { SCROLL_TO_CORRECTION } from '../vars';

describe('card-input', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        const cardInput = shallow(<CardInput />);

        expect(cardInput).toMatchSnapshot();
    });

    it('should scroll window to element on public `scrollTo` method call', () => {
        const cardInput = mount<CardInput>(<CardInput />);
        const elemTopPosition = cardInput.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        cardInput.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call input focus/blur methods on public focus/blur methods', () => {
        const cardInput = mount<CardInput>(<CardInput />);
        const input = cardInput.instance().root;

        jest.spyOn(input, 'focus');
        jest.spyOn(input, 'blur');

        cardInput.instance().focus();
        expect(input.focus).toHaveBeenCalled();

        cardInput.instance().blur();
        expect(input.blur).toHaveBeenCalled();
    });

    it('should set `type` attribute to `tel`', () => {
        const cardInput = mount(<CardInput />);

        const inputNode = cardInput.find('input');

        expect(inputNode.prop('type')).toBe('tel');
    });
});
