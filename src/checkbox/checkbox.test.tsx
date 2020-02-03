/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { CheckBox } from './checkbox';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('checkbox', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        const checkbox = shallow(<CheckBox />);

        expect(checkbox).toMatchSnapshot();
    });

    it('should checkbox render with type `button`', () => {
        const checkbox = mount(<CheckBox text='button label' type='button' />);
        const buttonNode = checkbox.find('button');

        expect(buttonNode.text()).toContain('button label');
        expect(buttonNode.length).toBe(1);
    });

    it('should checkbox render with type `normal`', () => {
        const checkbox = mount(<CheckBox text='some label' type='normal' />);
        const buttonNode = checkbox.find('button');
        const labelNode = checkbox.find('.checkbox__text');

        expect(labelNode.text()).toContain('some label');
        expect(buttonNode.length).toBe(0);
    });

    it('should checkbox render without any type', () => {
        const checkbox = mount(<CheckBox text='some label' />);
        const buttonNode = checkbox.find('button');
        const labelNode = checkbox.find('.checkbox__text');

        expect(buttonNode.length).toBe(0);
        expect(labelNode.text()).toBe('some label');
    });

    it('should set class on checkbox focus', () => {
        const checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('focus');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_focused');
    });

    it('should unset class on checkbox blur', () => {
        const checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('focus');
        checkbox.simulate('blur');

        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_focused');
    });

    it('should call `onFocus` callback after checkbox was focused', () => {
        const onFocus = jest.fn();
        const checkbox = mount(<CheckBox onFocus={ onFocus } />);

        checkbox.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after checkbox was blured', () => {
        const onBlur = jest.fn();
        const checkbox = mount(<CheckBox onBlur={ onBlur } />);

        checkbox.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should set class on checkbox mouse enter', () => {
        const checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('mouseEnter');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_hovered');
    });

    it('should unset class on checkbox mouse leave', () => {
        const checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('mouseEnter');
        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_hovered');

        checkbox.simulate('mouseLeave');
        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_hovered');
    });

    it('should call `onMouseEnter` callback after checkbox was hovered', () => {
        const onMouseEnter = jest.fn();
        const checkbox = mount(<CheckBox onMouseEnter={ onMouseEnter } />);

        checkbox.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after checkbox was leaved by cursor', () => {
        const onMouseLeave = jest.fn();
        const checkbox = mount(<CheckBox onMouseLeave={ onMouseLeave } />);

        checkbox.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set class on checkbox change', () => {
        const checkbox = mount(<CheckBox />);
        const controlNode = checkbox.find('input');

        controlNode.simulate('change');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
    });

    it('should call `onChange` callback after checkbox was changed', () => {
        const onChange = jest.fn();
        const checkbox = mount(<CheckBox onChange={ onChange } />);
        const controlNode = checkbox.find('input');

        controlNode.simulate('change');

        expect(onChange).toHaveBeenCalled();
    });

    it('should set class on checkbox button change', () => {
        const checkbox = mount(<CheckBox type='button' />);
        const buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
        expect(checkbox.find('button').prop('className')).toContain('tag-button_checked');
    });

    it('should call `onChange` callback after checkbox button was clicked', () => {
        const onChange = jest.fn();
        const checkbox = mount(<CheckBox type='button' onChange={ onChange } />);
        const buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    it('should work with props.checked', () => {
        const checkbox = mount(<CheckBox checked={ true } />);

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
    });

    it('should not checked with disabled props', () => {
        const checkbox = mount(<CheckBox type='button' disabled={ true } />);
        const buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_checked');
        expect(buttonNode.prop('className')).not.toContain('button_checked');
    });

    it('should scroll window to element on public scrollTo method', () => {
        const checkbox = mount<CheckBox>(<CheckBox type='button' />);
        const elemTopPosition = checkbox.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        checkbox.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });
});
