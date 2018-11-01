/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import CheckBox from './checkbox';

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
        let checkbox = shallow(<CheckBox />);

        expect(checkbox).toMatchSnapshot();
    });

    it('should checkbox render with type `button`', () => {
        let checkbox = mount(<CheckBox text='button label' type='button' />);
        let buttonNode = checkbox.find('button');

        expect(buttonNode.text()).toContain('button label');
        expect(buttonNode.length).toBe(1);
    });

    it('should checkbox render with type `normal`', () => {
        let checkbox = mount(<CheckBox text='some label' type='normal' />);
        let buttonNode = checkbox.find('button');
        let labelNode = checkbox.find('.checkbox__text');

        expect(labelNode.text()).toContain('some label');
        expect(buttonNode.length).toBe(0);
    });

    it('should checkbox render without any type', () => {
        let checkbox = mount(<CheckBox text='some label' />);
        let buttonNode = checkbox.find('button');
        let labelNode = checkbox.find('.checkbox__text');

        expect(buttonNode.length).toBe(0);
        expect(labelNode.text()).toBe('some label');
    });

    it('should set class on checkbox focus', () => {
        let checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('focus');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_focused');
    });

    it('should unset class on checkbox blur', () => {
        let checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('focus');
        checkbox.simulate('blur');

        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_focused');
    });

    it('should call `onFocus` callback after checkbox was focused', () => {
        let onFocus = jest.fn();
        let checkbox = mount(<CheckBox onFocus={ onFocus } />);

        checkbox.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after checkbox was blured', () => {
        let onBlur = jest.fn();
        let checkbox = mount(<CheckBox onBlur={ onBlur } />);

        checkbox.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should set class on checkbox mouse enter', () => {
        let checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('mouseEnter');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_hovered');
    });

    it('should unset class on checkbox mouse leave', () => {
        let checkbox = mount(<CheckBox text='some label' />);

        checkbox.simulate('mouseEnter');
        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_hovered');

        checkbox.simulate('mouseLeave');
        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_hovered');
    });

    it('should call `onMouseEnter` callback after checkbox was hovered', () => {
        let onMouseEnter = jest.fn();
        let checkbox = mount(<CheckBox onMouseEnter={ onMouseEnter } />);

        checkbox.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after checkbox was leaved by cursor', () => {
        let onMouseLeave = jest.fn();
        let checkbox = mount(<CheckBox onMouseLeave={ onMouseLeave } />);

        checkbox.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set class on checkbox change', () => {
        let checkbox = mount(<CheckBox />);
        let controlNode = checkbox.find('input');

        controlNode.simulate('change');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
    });

    it('should call `onChange` callback after checkbox was changed', () => {
        let onChange = jest.fn();
        let checkbox = mount(<CheckBox onChange={ onChange } />);
        let controlNode = checkbox.find('input');

        controlNode.simulate('change');

        expect(onChange).toHaveBeenCalled();
    });

    it('should set class on checkbox button change', () => {
        let checkbox = mount(<CheckBox type='button' />);
        let buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
        expect(checkbox.find('button').prop('className')).toContain('tag-button_checked');
    });

    it('should call `onChange` callback after checkbox button was clicked', () => {
        let onChange = jest.fn();
        let checkbox = mount(<CheckBox type='button' onChange={ onChange } />);
        let buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    it('should work with props.checked', () => {
        let checkbox = mount(<CheckBox checked={ true } />);

        expect(checkbox.find('.checkbox').prop('className')).toContain('checkbox_checked');
    });

    it('should not checked with disabled props', () => {
        let checkbox = mount(<CheckBox type='button' disabled={ true } />);
        let buttonNode = checkbox.find('button');

        buttonNode.simulate('click');

        expect(checkbox.find('.checkbox').prop('className')).not.toContain('checkbox_checked');
        expect(buttonNode.prop('className')).not.toContain('button_checked');
    });

    it('should scroll window to element on public scrollTo method', () => {
        let checkbox = mount(<CheckBox type='button' />);
        let elemTopPosition = checkbox.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        checkbox.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });
});
