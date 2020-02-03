/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Radio } from './radio';
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
        const radio = mount(<Radio />);

        expect(radio).toMatchSnapshot();
    });

    it('should radio input render without problems', () => {
        const radio = mount(<Radio text='some label' />);
        const radioInputNode = radio.find('input');

        expect(radioInputNode).toBeTruthy();
    });

    it('should radio render with type `button`', () => {
        const radio = mount(<Radio text='button label' type='button' />);
        const buttonNode = radio.find('button');

        expect(buttonNode).toBeTruthy();
        expect(buttonNode.text()).toContain('button label');
    });

    it('should radio render with type `normal`', () => {
        const radio = mount(<Radio text='some label' type='normal' />);
        const labelNode = radio.find('.radio__text');
        const buttonNode = radio.find('button');

        expect(buttonNode).toBeTruthy();
        expect(labelNode.text()).toContain('some label');
    });

    it('should radio render without any type', () => {
        const radio = mount(<Radio text='some label' />);
        const labelNode = radio.find('.radio__text');
        const buttonNode = radio.find('button');

        expect(buttonNode.length).toEqual(0);
        expect(labelNode.text()).toContain('some label');
    });

    it('should set class on radio focus', () => {
        const radio = mount(<Radio text='some label' />);

        radio.simulate('focus');

        expect(radio.getDOMNode().className).toContain('radio_focused');
    });

    it('should unset class on radio blur', () => {
        const radio = mount(<Radio text='some label' />);

        radio.simulate('focus');

        expect(radio.getDOMNode().className).toContain('radio_focused');

        radio.simulate('blur');

        expect(radio.getDOMNode().className).not.toContain('radio_focused');
    });

    it('should call input focus on public focus method', () => {
        const radio = mount<Radio>(<Radio text='some label' />);
        const input = (radio.find('input') as any).instance();

        jest.spyOn(input, 'focus');

        radio.instance().focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should call document.activeElement.blur() on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        const radio = mount<Radio>(<Radio text='some label' />);

        (document.activeElement as HTMLElement).blur = jest.fn();

        radio.instance().blur();

        expect((document.activeElement as HTMLElement).blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after radio was focused', () => {
        const onFocus = jest.fn();
        const radio = mount(<Radio onFocus={ onFocus } />);

        radio.simulate('focus');

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call `onBlur` callback after radio was blured', () => {
        const onBlur = jest.fn();
        const radio = mount(<Radio onBlur={ onBlur } />);

        radio.simulate('blur');

        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call `onFocus` callback after radio was focused with value', () => {
        const onFocus = jest.fn();
        const radio = mount(<Radio value='test' onFocus={ onFocus } />);

        radio.simulate('focus');

        expect(onFocus.mock.calls[0][0]).toMatchObject({ target: { value: 'test' } });
    });

    it('should call `onBlur` callback after radio was blured with value', () => {
        const onBlur = jest.fn();
        const radio = mount(<Radio value='test' onBlur={ onBlur } />);

        radio.simulate('blur');

        expect(onBlur.mock.calls[0][0]).toMatchObject({ target: { value: 'test' } });
    });

    it('should set class on radio mouse enter', () => {
        const radio = mount(<Radio text='some label' />);

        radio.simulate('mouseEnter');

        expect(radio.getDOMNode().className).toContain('radio_hovered');
    });

    it('should unset class on radio mouse leave', () => {
        const radio = mount(<Radio text='some label' />);

        radio.simulate('mouseEnter');

        expect(radio.getDOMNode().className).toContain('radio_hovered');

        radio.simulate('mouseLeave');

        expect(radio.getDOMNode().className).not.toContain('radio_hovered');
    });

    it('should call `onMouseEnter` callback after radio was hovered', () => {
        const onMouseEnter = jest.fn();
        const radio = mount(<Radio onMouseEnter={ onMouseEnter } />);

        radio.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseLeave` callback after radio was leaved by cursor', () => {
        const onMouseLeave = jest.fn();
        const radio = mount(<Radio onMouseLeave={ onMouseLeave } />);

        radio.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should set class on radio change', () => {
        const radio = mount(<Radio />);
        const radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(radio.getDOMNode().className).toContain('radio_checked');
    });

    it('should call `onChange` callback after radio was changed', () => {
        const onChange = jest.fn();
        const radio = mount(<Radio onChange={ onChange } />);
        const radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should call `onChange` callback after radio was changed with value and checked state', () => {
        const onChange = jest.fn();
        const radio = mount(<Radio checked={ false } value='test' onChange={ onChange } />);
        const radioInputNode = radio.find('input');

        radioInputNode.simulate('change');

        expect(onChange).toHaveBeenCalledWith('test', true);
    });

    it('should set class on radio button change', () => {
        const radio = mount(<Radio type='button' />);
        const buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(radio.getDOMNode().className).toContain('radio_checked');
        expect(buttonNode.getDOMNode().className).toContain('tag-button_checked');
    });

    it('should call `onChange` callback after radio button was clicked', () => {
        const onChange = jest.fn();
        const radio = mount(<Radio type='button' onChange={ onChange } />);
        const buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it('should work with props.checked', () => {
        const radio = mount(<Radio checked={ true } />);

        expect(radio.getDOMNode().className).toContain('radio_checked');
    });

    it('should not checked with disabled props', () => {
        const radio = mount(<Radio type='button' disabled={ true } />);
        const buttonNode = radio.find('button');

        buttonNode.simulate('click');

        expect(radio.getDOMNode().className).not.toContain('radio_checked');
        expect(buttonNode.getDOMNode().className).not.toContain('button_checked');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        const radio = mount<Radio>(<Radio text='some label' />);
        const elemTopPosition = radio.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        radio.instance().scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
            done();
        }, 0);
    });
});
