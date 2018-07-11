/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Radio from './radio';
import { SCROLL_TO_CORRECTION } from '../vars';

describe('radio', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let radio = mount(<Radio />);

        expect(radio).toMatchSnapshot();
    });

    it('should radio input render without problems', () => {
        let radio = mount(<Radio text='some label' />);
        let radioInputNode = radio.find('input');

        expect(radioInputNode).toBeTruthy();
    });

    it('should radio render with type `button`', () => {
        let radio = mount(<Radio text='button label' type='button' />);
        let buttonNode = radio.find('button');

        expect(buttonNode).toBeTruthy();
        expect(buttonNode.text()).toContain('button label');
    });

    it('should radio render with type `normal`', () => {
        let radio = mount(<Radio text='some label' type='normal' />);
        let labelNode = radio.find('.radio__text');
        let buttonNode = radio.find('button');

        expect(buttonNode).toBeTruthy();
        expect(labelNode.text()).toContain('some label');
    });

    it('should radio render without any type', () => {
        let radio = mount(<Radio text='some label' />);
        let labelNode = radio.find('.radio__text');
        let buttonNode = radio.find('button');

        expect(buttonNode.length).toEqual(0);
        expect(labelNode.text()).toContain('some label');
    });

    it('should set class on radio focus', () => {
        let radio = mount(<Radio text='some label' />);

        radio.simulate('focus');

        expect(radio.getDOMNode().className).toContain('radio_focused');
    });

    it('should unset class on radio blur', () => {
        let radio = mount(<Radio text='some label' />);

        radio.simulate('focus');

        expect(radio.getDOMNode().className).toContain('radio_focused');

        radio.simulate('blur');

        expect(radio.getDOMNode().className).not.toContain('radio_focused');
    });

    it('should call input focus on public focus method', () => {
        let radio = mount(<Radio text='some label' />);
        let input = radio.find('input').instance();
        jest.spyOn(input, 'focus');

        radio.instance().focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should call document.activeElement.blur() on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        let radio = mount(<Radio text='some label' />);

        document.activeElement.blur = jest.fn();

        radio.instance().blur();

        expect(document.activeElement.blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after radio was focused', () => {
        let onFocus = jest.fn();
        let radio = mount(<Radio onFocus={ onFocus } />);

        radio.simulate('focus');

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call `onBlur` callback after radio was blured', () => {
        let onBlur = jest.fn();
        let radio = mount(<Radio onBlur={ onBlur } />);

        radio.simulate('blur');

        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call `onFocus` callback after radio was focused with value', () => {
        let onFocus = jest.fn();
        let radio = mount(<Radio value='test' onFocus={ onFocus } />);

        radio.simulate('focus');

        expect(onFocus.mock.calls[0][0]).toMatchObject({ target: { value: 'test' } });
    });

    it('should call `onBlur` callback after radio was blured with value', () => {
        let onBlur = jest.fn();
        let radio = mount(<Radio value='test' onBlur={ onBlur } />);

        radio.simulate('blur');

        expect(onBlur.mock.calls[0][0]).toMatchObject({ target: { value: 'test' } });
    });

    it('should set class on radio mouse enter', () => {
        let radio = mount(<Radio text='some label' />);

        radio.simulate('mouseEnter');

        expect(radio.getDOMNode().className).toContain('radio_hovered');
    });

    it('should unset class on radio mouse leave', () => {
        let radio = mount(<Radio text='some label' />);

        radio.simulate('mouseEnter');

        expect(radio.getDOMNode().className).toContain('radio_hovered');

        radio.simulate('mouseLeave');

        expect(radio.getDOMNode().className).not.toContain('radio_hovered');
    });

    it('should call `onMouseEnter` callback after radio was hovered', () => {
        let onMouseEnter = jest.fn();
        let radio = mount(<Radio onMouseEnter={ onMouseEnter } />);

        radio.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseLeave` callback after radio was leaved by cursor', () => {
        let onMouseLeave = jest.fn();
        let radio = mount(<Radio onMouseLeave={ onMouseLeave } />);

        radio.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should set class on radio change', () => {
        let radio = mount(<Radio />);
        let radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(radio.getDOMNode().className).toContain('radio_checked');
    });

    it('should call `onChange` callback after radio was changed', () => {
        let onChange = jest.fn();
        let radio = mount(<Radio onChange={ onChange } />);
        let radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call `onChange` callback after radio was changed with value and checked state', () => {
        let onChange = jest.fn();
        let radio = mount(<Radio checked={ false } value='test' onChange={ onChange } />);
        let radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(onChange).toHaveBeenCalledWith('test', true);
    });

    it('should set class on radio button change', () => {
        let radio = mount(<Radio type='button' />);
        let buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(radio.getDOMNode().className).toContain('radio_checked');
        expect(buttonNode.getDOMNode().className).toContain('tag-button_checked');
    });

    it('should call `onChange` callback after radio button was clicked', () => {
        let onChange = jest.fn();
        let radio = mount(<Radio type='button' onChange={ onChange } />);
        let buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should work with props.checked', () => {
        let radio = mount(<Radio checked={ true } />);

        expect(radio.getDOMNode().className).toContain('radio_checked');
    });

    it('should not checked with disabled props', () => {
        let radio = mount(<Radio type='button' disabled={ true } />);
        let buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(radio.getDOMNode().className).not.toContain('radio_checked');
        expect(buttonNode.getDOMNode().className).not.toContain('button_checked');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let radio = mount(<Radio text='some label' />);
        let elemTopPosition = radio.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        radio.instance().scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
            done();
        }, 0);
    });
});
