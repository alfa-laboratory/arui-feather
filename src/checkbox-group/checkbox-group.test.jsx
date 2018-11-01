/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import CheckBoxGroup from './checkbox-group';
import CheckBox from '../checkbox/checkbox';

describe('checkbox-group', () => {
    it('should render without children', () => {
        let checkboxGroup = shallow(<CheckBoxGroup />);

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render with only one children', () => {
        let checkboxGroup = shallow(
            <CheckBoxGroup>
                <CheckBox key='1' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render with many checkbox children without problems', () => {
        let checkboxGroup = shallow(
            <CheckBoxGroup>
                <CheckBox key='1' text='label' />
                <CheckBox key='2' text='label' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup).toMatchSnapshot();
    });

    it('should render checked checkbox with value from `value` props', () => {
        let checkboxGroup = mount(
            <CheckBoxGroup
                value={ ['value_1'] }
            >
                <CheckBox value='value_1' text='label 1' />
                <CheckBox value='value_2' text='label 2' />
            </CheckBoxGroup>
        );
        let checkboxNode = checkboxGroup.find('.checkbox').at(0);

        expect(checkboxNode.prop('className')).toContain('checkbox_checked');
    });

    it('should focus first child checkbox-button on public focus method', () => {
        let checkboxGroup = mount(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );
        let firstCheckboxInstance = checkboxGroup.instance().checkboxes[0];

        jest.spyOn(firstCheckboxInstance, 'focus');
        checkboxGroup.instance().focus();

        expect(firstCheckboxInstance.focus).toHaveBeenCalled();
    });

    it('should lose focus on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        document.activeElement.blur = jest.fn();

        let checkboxGroup = mount(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );

        checkboxGroup.instance().blur();

        expect(document.activeElement.blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after checkbox-group was focused', () => {
        let onFocus = jest.fn();
        let checkBoxGroup = mount(
            <CheckBoxGroup onFocus={ onFocus }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after checkbox-group was blured', () => {
        let onBlur = jest.fn();
        let checkBoxGroup = mount(
            <CheckBoxGroup onBlur={ onBlur }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onChange` callback after checkbox-group was checked', () => {
        let onChange = jest.fn();
        let checkBoxGroup = mount(
            <CheckBoxGroup onChange={ onChange }>
                <CheckBox value='value_1' />
            </CheckBoxGroup>
        );
        let checkboxControlNode = checkBoxGroup.find('.checkbox__control');

        checkboxControlNode.simulate('change');
        expect(onChange).toHaveBeenCalledWith(['value_1']);
    });

    it('should disable all child radios when disabled=true', () => {
        let checkBoxGroup = mount(
            <CheckBoxGroup disabled={ true }>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );

        let disabledCheckboxNodes = checkBoxGroup.find('.checkbox_disabled');
        expect(disabledCheckboxNodes.length).toBe(3);
    });

    it('shouldn\'t call `onChange` callback when disabled=true', function () {
        let onChange = jest.fn();
        let checkboxGroup = mount(
            <CheckBoxGroup onChange={ onChange } disabled={ true }>
                <CheckBox />
            </CheckBoxGroup>
        );
        let checkbox = checkboxGroup.find('.checkbox');

        checkbox.simulate('change');

        expect(onChange).not.toHaveBeenCalled();
    });
});
