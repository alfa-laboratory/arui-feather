/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount, shallow } from 'enzyme';

import RadioGroup from './radio-group';
import Radio from '../radio/radio';

describe('radio-group', () => {
    it('should render without any children', () => {
        let radioGroup = shallow(<RadioGroup />);

        expect(radioGroup).toMatchSnapshot();
    });

    it('should render with only one children', () => {
        let radioGroup = shallow(<RadioGroup><Radio key='1' /></RadioGroup>);

        expect(radioGroup).toMatchSnapshot();
    });

    it('should render with many radio children without problems', () => {
        let radioGroup = shallow(
            <RadioGroup>
                <Radio key='1' text='label' />
                <Radio key='2' text='label' />
            </RadioGroup>
        );

        expect(radioGroup).toMatchSnapshot();
    });

    it('should render checked radio with value from `value` props', () => {
        let radioGroup = mount(
            <RadioGroup
                value='1'
            >
                <Radio key='1' value='1' text='label 1' />
                <Radio key='2' value='2' text='label 2' />
            </RadioGroup>
        );
        let radioNode = radioGroup.find('.radio').at(0);

        expect(radioNode.getDOMNode().className).toContain('radio_checked');
    });

    it('should render radio in error state with error on radioGroup', () => {
        let radioGroup = mount(
            <RadioGroup error='errorText'>
                <Radio key='1' />
            </RadioGroup>
        );
        let radioNode = radioGroup.find('.radio');

        expect(radioNode.getDOMNode().className).toContain('radio_invalid');
    });

    it('should render with `error` from props', () => {
        let radioGroup = mount(
            <RadioGroup error='errorText'>
                <Radio key='1' />
            </RadioGroup>
        );
        let subNode = radioGroup.find('.radio-group__sub');

        expect(subNode.text()).toContain('errorText');
    });

    it('should render with `hint` from props', () => {
        let radioGroup = mount(
            <RadioGroup hint='hintText'>
                <Radio key='1' />
            </RadioGroup>
        );
        let subNode = radioGroup.find('.radio-group__sub');

        expect(subNode.text()).toContain('hintText');
    });

    it('should render with `error` and without `hint` when both of them passed via props', () => {
        let radioGroup = mount(
            <RadioGroup error='errorText' hint='hintText'>
                <Radio key='1' />
            </RadioGroup>
        );
        let subNode = radioGroup.find('.radio-group__sub');

        expect(subNode.text()).toContain('errorText');
    });

    it('should focus first child radio-button on public focus method', () => {
        let radioGroup = mount(
            <RadioGroup>
                <Radio key='1' />
                <Radio key='2' />
                <Radio key='3' />
            </RadioGroup>
        );

        const firstRadio = radioGroup.instance().radios[0];
        jest.spyOn(firstRadio, 'focus');

        radioGroup.instance().focus();

        expect(firstRadio.focus).toHaveBeenCalled();
    });

    it('should lose focus on public blur method', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        let radioGroup = mount(
            <RadioGroup>
                <Radio key='1' />
                <Radio key='2' />
                <Radio key='3' />
            </RadioGroup>
        );

        document.activeElement.blur = jest.fn();

        radioGroup.instance().blur();

        expect(document.activeElement.blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after radio-group was focused', () => {
        let onFocus = jest.fn();
        let radioGroup = mount(
            <RadioGroup onFocus={ onFocus }>
                <Radio key='1' />
            </RadioGroup>
        );

        radioGroup.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after radio-group was blured', () => {
        let onBlur = jest.fn();
        let radioGroup = mount(
            <RadioGroup onBlur={ onBlur }>
                <Radio key='1' />
            </RadioGroup>
        );

        radioGroup.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onChange` callback after radio-group was checked', () => {
        let onChange = jest.fn();
        let radioGroup = mount(
            <RadioGroup onChange={ onChange }>
                <Radio key='1' value='1' />
            </RadioGroup>
        );
        let radioControlNode = radioGroup.find('.radio__control');

        radioControlNode.simulate('change');

        expect(onChange).toHaveBeenCalledWith('1');
    });

    it('should change other radio checked status when check one', () => {
        const radioGroupNode = mount(
            <RadioGroup value='1'>
                <Radio key='1' value='1' />
                <Radio key='2' value='2' />
            </RadioGroup>
        );
        const radios = radioGroupNode.find('input[type="radio"]');
        const secondRadioControlNode = radios.at(1);

        secondRadioControlNode.simulate('change');

        expect(radioGroupNode.state().value).toEqual('2');
    });

    it('shouldn\'t call `onChange` when radio group value and radio value are same', () => {
        const onChange = jest.fn();
        const radioGroupNode = mount(
            <RadioGroup value='1' onChange={ onChange }>
                <Radio key='1' value='1' />
                <Radio key='2' value='2' />
            </RadioGroup>
        );
        const radios = radioGroupNode.find('input[type="radio"]');
        const secondRadioControlNode = radios.at(0);

        secondRadioControlNode.simulate('change');

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should disable all child radios when disabled=true', () => {
        let radioGroup = mount(
            <RadioGroup disabled={ true }>
                <Radio key='1' />
                <Radio key='2' />
                <Radio key='3' />
            </RadioGroup>
        );

        let disabledRadioNodes = radioGroup.find('.radio_disabled');
        expect(disabledRadioNodes.length).toBe(3);
    });

    it('shouldn\'t call `onChange` callback when disabled=true', function () {
        let onChange = jest.fn();
        let radioGroup = mount(
            <RadioGroup onChange={ onChange } disabled={ true }>
                <Radio key='1' />
            </RadioGroup>
        );
        let radio = radioGroup.find('.radio');

        radio.simulate('change');

        expect(onChange).not.toHaveBeenCalled();
    });
});
