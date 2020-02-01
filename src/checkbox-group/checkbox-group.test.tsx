/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { CheckBoxGroup } from './checkbox-group';
import { CheckBox } from '../checkbox/checkbox';

describe('checkbox-group', () => {
    it('should render without children', () => {
        const checkboxGroup = shallow(<CheckBoxGroup />);

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render with only one children', () => {
        const checkboxGroup = shallow(
            <CheckBoxGroup>
                <CheckBox key='1' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render with many checkbox children without problems', () => {
        const checkboxGroup = shallow(
            <CheckBoxGroup>
                <CheckBox key='1' text='label' />
                <CheckBox key='2' text='label' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render checked checkbox with value from `value` props', () => {
        const checkboxGroup = mount(
            <CheckBoxGroup
                value={ ['value_1'] }
            >
                <CheckBox value='value_1' text='label 1' />
                <CheckBox value='value_2' text='label 2' />
            </CheckBoxGroup>
        );
        const checkboxNode = checkboxGroup.find('.checkbox').at(0);

        expect(checkboxNode.prop('className')).toContain('checkbox_checked');
    });

    it('should focus first child checkbox-button on public focus method', () => {
        const checkboxGroup = mount<CheckBoxGroup>(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );
        const firstCheckboxInstance = checkboxGroup.instance().checkboxes[0];

        jest.spyOn(firstCheckboxInstance, 'focus');
        checkboxGroup.instance().focus();

        expect(firstCheckboxInstance.focus).toHaveBeenCalled();
    });

    it('should lose focus on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        (document.activeElement as HTMLElement).blur = jest.fn();

        const checkboxGroup = mount<CheckBoxGroup>(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );

        checkboxGroup.instance().blur();

        expect((document.activeElement as HTMLElement).blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after checkbox-group was focused', () => {
        const onFocus = jest.fn();
        const checkBoxGroup = mount(
            <CheckBoxGroup onFocus={ onFocus }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after checkbox-group was blured', () => {
        const onBlur = jest.fn();
        const checkBoxGroup = mount(
            <CheckBoxGroup onBlur={ onBlur }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onChange` callback after checkbox-group was checked', () => {
        const onChange = jest.fn();
        const checkBoxGroup = mount(
            <CheckBoxGroup onChange={ onChange }>
                <CheckBox value='value_1' />
            </CheckBoxGroup>
        );
        const checkboxControlNode = checkBoxGroup.find('.checkbox__control');

        checkboxControlNode.simulate('change');
        expect(onChange).toHaveBeenCalledWith(['value_1']);
    });

    it('should disable all child radios when disabled=true', () => {
        const checkBoxGroup = mount(
            <CheckBoxGroup disabled={ true }>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );

        const disabledCheckboxNodes = checkBoxGroup.find('.checkbox_disabled');

        expect(disabledCheckboxNodes.length).toBe(3);
    });

    it('shouldn\'t call `onChange` callback when disabled=true', () => {
        const onChange = jest.fn();
        const checkboxGroup = mount(
            <CheckBoxGroup onChange={ onChange } disabled={ true }>
                <CheckBox />
            </CheckBoxGroup>
        );
        const checkbox = checkboxGroup.find('.checkbox');

        checkbox.simulate('change');

        expect(onChange).not.toHaveBeenCalled();
    });
});
