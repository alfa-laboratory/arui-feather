/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { mount } from 'enzyme';

import InputAutocomplete from './input-autocomplete';

import { SCROLL_TO_CORRECTION } from '../vars';

const OPTIONS = [
    { value: 'VKontakte' },
    { value: 'Facebook' },
    { value: 'Twitter' }
];

const OPTIONS2 = [
    { value: 'VKontakte' },
    {
        value: 'VKontakte',
        key: 'vk2'
    }
];

describe('input-autocomplete', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        let inputAutocomplete = mount(<InputAutocomplete />);

        expect(inputAutocomplete).toMatchSnapshot();
    });

    it('should render without problem when give item with duplicate value', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS2 } />);
        let optionsNode = inputAutocomplete.find('.menu-item');

        expect(optionsNode.length).toBe(OPTIONS2.length);
    });

    it('should render input with provided default value', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } defaultValue='default' />);
        expect(inputAutocomplete).toMatchSnapshot();
    });

    it('should render input and popup with options', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } />);

        expect(inputAutocomplete.find('.popup').length).toBe(1);
        expect(inputAutocomplete.find('.input__control').length).toBe(1);
    });

    it('should call input.focus on public focus method', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } />);
        let inputInstance = inputAutocomplete.find('Input').instance();
        jest.spyOn(inputInstance, 'focus');

        inputAutocomplete.instance().focus();

        expect(inputInstance.focus).toHaveBeenCalled();
    });

    it('should scroll window to element on public scrollTo method', () => {
        let inputAutocomplete = mount(<InputAutocomplete />);
        let inputNode = inputAutocomplete.find('.input__control');

        let elemTopPosition = inputNode.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        inputAutocomplete.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should unset class on input blur', () => {
        let inputAutocomplete = mount(<InputAutocomplete />);

        inputAutocomplete.find('input').simulate('focus');

        expect(inputAutocomplete.find('.input_focused').length).toBe(1);

        inputAutocomplete.find('input').simulate('blur');

        expect(inputAutocomplete.find('.input_focused').length).toBe(0);
    });

    it('should set width to popup equal or more than button width', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } opened={ true } />);
        let inputNode = inputAutocomplete.find('.input').at(0);
        let popupNode = inputAutocomplete.find('.popup');

        let inputWidth = inputNode.getDOMNode().getBoundingClientRect().width;
        let popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBeGreaterThanOrEqual(inputWidth);
    });

    it('should set popup width equal to input width when equalPopupWidth = true', () => {
        let props = {
            options: [
                {
                    value: `Very, very long option text
                            used just to make autocomplete popup
                            strech really really wide and another
                            couple of words just to be sure`
                }
            ],
            equalPopupWidth: true,
            opened: true
        };

        let inputAutocomplete = mount(<InputAutocomplete { ...props } />);
        let inputNode = inputAutocomplete.find('.input').at(0);
        let popupNode = inputAutocomplete.find('.popup');
        let popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        let inputWidth = inputNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBe(inputWidth);
    });

    it('should set directions to popup', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } directions={ ['right-bottom'] } />);
        let popupNode = inputAutocomplete.find('.popup');

        expect(popupNode.props().className).toContain('popup_direction_right-bottom');
    });

    it('should render all options when input value is empty', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } />);
        let optionsNode = inputAutocomplete.find('.menu-item');

        expect(optionsNode.length).toBe(OPTIONS.length);
    });

    it('should change input value after option was clicked', () => {
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } />);
        let firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(inputAutocomplete.find('input').props().value).toBe(OPTIONS[0].value);
    });

    it('should call `onItemSelect` callback after option was clicked', () => {
        let onItemSelect = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } onItemSelect={ onItemSelect } />);
        let firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onItemSelect).toHaveBeenCalled();
    });

    it('should call `onChange` callback after option was clicked and pass value to it', () => {
        let onChange = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } onChange={ onChange } />);
        let firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalledWith('VKontakte');
    });

    it('should call `onChange` callback after option was clicked and pass `text` when `option.text` is exist', () => {
        let onChange = jest.fn();
        const OPTIONS = [
            { value: 'VKontakte', text: 'ВКонтакте' },
            { value: 'Facebook', text: 'Фейсбук' },
            { value: 'Twitter', text: 'Твиттер' }
        ];
        let inputAutocomplete = mount(<InputAutocomplete options={ OPTIONS } onChange={ onChange } />);
        let firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalledWith('ВКонтакте');
    });

    it('should not call `onChange` callback after option was clicked when updateValueOnItemSelect = false', () => {
        let onChange = jest.fn();
        let updateValueOnItemSelect = mount(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } updateValueOnItemSelect={ false } />
        );
        let firstOptionNode = updateValueOnItemSelect.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        let onKeyDown = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete onKeyDown={ onKeyDown } />);
        let controlNode = inputAutocomplete.find('input');

        controlNode.simulate('keyDown');

        expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after component was focused', () => {
        let onFocus = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete onFocus={ onFocus } />);
        let controlNode = inputAutocomplete.find('input');

        // simulated event don't actually change focus
        // so we just patch input.getControl
        inputAutocomplete.instance().input.getControl = jest.fn().mockReturnValue(document.activeElement);

        controlNode.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after component was blured', (done) => {
        let onBlur = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete onBlur={ onBlur } />);
        let controlNode = inputAutocomplete.find('input');
        inputAutocomplete.setState({ inputFocused: true });
        controlNode.simulate('blur');

        setTimeout(() => {
            expect(onBlur).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should call `onChange` callback', () => {
        let onChange = jest.fn();
        let inputAutocomplete = mount(<InputAutocomplete onChange={ onChange } />);
        let controlNode = inputAutocomplete.find('input');

        controlNode.simulate('change', { target: { value: 'other value' } });

        expect(onChange).toHaveBeenCalled();
    });

    it('should close popup after item select if closeOnSelect is set', (done) => {
        let inputAutocomplete = mount(
            <InputAutocomplete closeOnSelect={ true } updateValueOnItemSelect={ false } options={ OPTIONS } />
        );
        let inputNode = inputAutocomplete.instance().input;
        jest.spyOn(inputNode, 'blur');

        inputAutocomplete.setState({ inputFocused: true });

        expect(inputAutocomplete.find('.popup').props().className).toContain('popup_visible');

        inputAutocomplete.find('.menu-item').at(0).simulate('click');


        setTimeout(() => {
            expect(inputNode.blur).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should have disabled option, which can not be selected, if disabled property is set true', (done) => {
        const OPTIONS = [
            { value: 'VKontakte', props: { disabled: true } },
            { value: 'Facebook' },
            { value: 'Twitter' }
        ];
        let onChange = jest.fn();

        let inputAutocomplete = mount(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } />
        );

        inputAutocomplete.find('.menu-item').at(0).simulate('click');

        let firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        expect(firstOptionNode.props().className).toContain('menu-item_disabled');

        setTimeout(() => {
            expect(onChange).toHaveBeenCalledTimes(0);
            done();
        }, 0);
    });
});
