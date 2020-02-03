/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { Textarea } from './textarea';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('textarea', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        const textarea = mount(<Textarea />);

        expect(textarea).toMatchSnapshot();
    });

    it('should unset class on textarea blur', () => {
        const textarea = mount(<Textarea />);
        const control = textarea.find('textarea');

        control.simulate('focus');
        expect(textarea.getDOMNode().className).toContain('textarea_focused');

        control.simulate('blur');
        expect(textarea.getDOMNode().className).not.toContain('textarea_focused');
    });

    it('should render with disabled class', () => {
        const textarea = mount(<Textarea disabled={ true } />);

        expect(textarea.getDOMNode().className).toContain('textarea_disabled');
    });

    it('should focus textarea on public focus method', () => {
        const wrapper = mount<Textarea>(<Textarea />);

        const textarea = wrapper.instance().control;

        jest.spyOn(textarea, 'focus');

        wrapper.instance().focus();

        expect(textarea.focus).toHaveBeenCalled();
    });

    it('should lose focus on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        const textarea = mount<Textarea>(<Textarea />);

        (document.activeElement as HTMLElement).blur = jest.fn();

        textarea.instance().blur();

        expect((document.activeElement as HTMLElement).blur).toHaveBeenCalled();
    });

    it('should set class on textarea focus', () => {
        const textarea = mount(<Textarea />);

        textarea.find('textarea').simulate('focus');

        expect(textarea.getDOMNode().className).toContain('textarea_focused');
    });

    it('should call `onFocus` callback after textarea was focused', () => {
        const onFocus = jest.fn();
        const textarea = mount(<Textarea onFocus={ onFocus } />);

        textarea.find('textarea').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after textarea was blured', () => {
        const onBlur = jest.fn();
        const textarea = mount(<Textarea onBlur={ onBlur } />);

        textarea.find('textarea').simulate('blur');

        expect(onBlur).toHaveBeenCalled();
        expect(onBlur.mock.calls[0][0]).toMatchObject({ type: 'blur' });
    });

    it('should change the state value when props is not defined', () => {
        const textarea = mount<Textarea>(<Textarea />);
        const control = textarea.find('textarea');

        control.simulate('change', { target: { value: 'other value' } });

        expect(textarea.state().value).toEqual('other value');
    });

    it('should set value from props', () => {
        const textarea = mount(<Textarea value='text' />);

        expect(textarea.find('textarea').props().value).toEqual('text');
    });

    it('should call onChange callback', () => {
        const onChange = jest.fn();
        const textarea = mount(<Textarea onChange={ onChange } />);

        textarea.find('textarea').simulate('change', { target: { value: 'other value' } });

        expect(onChange).toHaveBeenCalled();
    });

    it('should render with `off` autocomplete attribute', () => {
        const textarea = shallow(<Textarea autocomplete={ false } />);

        expect(textarea.find('.textarea__control').props().autoComplete).toEqual('off');
    });

    it('should render with `on` autocomplete attribute', () => {
        const textarea = shallow(<Textarea autocomplete={ true } />);

        expect(textarea.find('.textarea__control').props().autoComplete).toEqual('on');
    });

    it('should render with resize `none` class', () => {
        const textarea = mount(<Textarea resize='none' />);

        expect(textarea.getDOMNode().className).toContain('textarea_resize_none');
    });

    it('should render with resize `both` class', () => {
        const textarea = mount(<Textarea resize='both' />);

        expect(textarea.getDOMNode().className).toContain('textarea_resize_both');
    });

    it('should render with resize `vertical` class', () => {
        const textarea = mount(<Textarea resize='vertical' />);

        expect(textarea.getDOMNode().className).toContain('textarea_resize_vertical');
    });

    it('should render with resize `horizontal` class', () => {
        const textarea = mount(<Textarea resize='horizontal' />);

        expect(textarea.getDOMNode().className).toContain('textarea_resize_horizontal');
    });

    it('should scroll window to element on public scrollTo method', () => {
        const textarea = mount<Textarea>(<Textarea />);
        const elemTopPosition = textarea.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        textarea.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should render with autosize class', () => {
        const textarea = mount(<Textarea autosize={ true } />);

        expect(textarea.getDOMNode().className).toContain('textarea_autosize');
    });

    it('should call onKeyPress callback', () => {
        const onKeyPress = jest.fn();
        const textarea = mount(<Textarea onKeyPress={ onKeyPress } />);

        textarea.find('textarea').simulate('keyPress', { key: 'Enter' });

        expect(onKeyPress).toHaveBeenCalled();
    });

    it('should call onKeyDown callback', () => {
        const onKeyDown = jest.fn();
        const textarea = mount(<Textarea onKeyDown={ onKeyDown } />);

        textarea.find('textarea').simulate('keyDown', { key: 'Down' });

        expect(onKeyDown).toHaveBeenCalled();
    });
});
