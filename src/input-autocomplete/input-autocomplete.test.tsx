/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { mount } from 'enzyme';

import { Input } from '../input/input';
import { InputAutocomplete } from './input-autocomplete';

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
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete />);

        expect(inputAutocomplete).toMatchSnapshot();
    });

    it('should render without problem when give item with duplicate value', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS2 } />);
        const optionsNode = inputAutocomplete.find('.menu-item');

        expect(optionsNode.length).toBe(OPTIONS2.length);
    });

    it('should render input with provided default value', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } defaultValue='default' />);

        expect(inputAutocomplete).toMatchSnapshot();
    });

    it('should render input and popup with options', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } />);

        expect(inputAutocomplete.find('.popup').length).toBe(1);
        expect(inputAutocomplete.find('.input__control').length).toBe(1);
    });

    it('should call input.focus on public focus method', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } />);
        const inputInstance = inputAutocomplete.find<Input>(Input).instance();

        jest.spyOn(inputInstance, 'focus');

        inputAutocomplete.instance().focus();

        expect(inputInstance.focus).toHaveBeenCalled();
    });

    it('should scroll window to element on public scrollTo method', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete />);
        const inputNode = inputAutocomplete.find('.input__control');

        const elemTopPosition = inputNode.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        inputAutocomplete.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should unset class on input blur', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete />);

        inputAutocomplete.find('input').simulate('focus');

        expect(inputAutocomplete.find('.input_focused').length).toBe(1);

        inputAutocomplete.find('input').simulate('blur');

        expect(inputAutocomplete.find('.input_focused').length).toBe(0);
    });

    it('should set width to popup equal or more than button width', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } opened={ true } />);
        const inputNode = inputAutocomplete.find('.input').at(0);
        const popupNode = inputAutocomplete.find('.popup');

        const inputWidth = inputNode.getDOMNode().getBoundingClientRect().width;
        const popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBeGreaterThanOrEqual(inputWidth);
    });

    it('should set popup width equal to input width when equalPopupWidth = true', () => {
        const props = {
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

        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete { ...props } />);
        const inputNode = inputAutocomplete.find('.input').at(0);
        const popupNode = inputAutocomplete.find('.popup');
        const popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        const inputWidth = inputNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBe(inputWidth);
    });

    it('should set directions to popup', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } directions={ ['right-bottom'] } />);
        const popupNode = inputAutocomplete.find('.popup');

        expect(popupNode.props().className).toContain('popup_direction_right-bottom');
    });

    it('should render all options when input value is empty', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } />);
        const optionsNode = inputAutocomplete.find('.menu-item');

        expect(optionsNode.length).toBe(OPTIONS.length);
    });

    it('should change input value after option was clicked', () => {
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete options={ OPTIONS } />);
        const firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(inputAutocomplete.find('input').props().value).toBe(OPTIONS[0].value);
    });

    it('should call `onItemSelect` callback after option was clicked', () => {
        const onItemSelect = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(
            <InputAutocomplete options={ OPTIONS } onItemSelect={ onItemSelect } />
        );
        const firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onItemSelect).toHaveBeenCalled();
    });

    it('should call `onChange` callback after option was clicked and pass value to it', () => {
        const onChange = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } />
        );
        const firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalledWith('VKontakte');
    });

    it('should call `onChange` callback after option was clicked and pass `text` when `option.text` is exist', () => {
        const onChange = jest.fn();
        const OPTIONS = [
            { value: 'VKontakte', text: 'ВКонтакте' },
            { value: 'Facebook', text: 'Фейсбук' },
            { value: 'Twitter', text: 'Твиттер' }
        ];
        const inputAutocomplete = mount<InputAutocomplete>(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } />
        );

        const firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalledWith('ВКонтакте');
    });

    it('should not call `onChange` callback after option was clicked when updateValueOnItemSelect = false', () => {
        const onChange = jest.fn();
        const updateValueOnItemSelect = mount(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } updateValueOnItemSelect={ false } />
        );
        const firstOptionNode = updateValueOnItemSelect.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).not.toHaveBeenCalled();
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        const onKeyDown = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete onKeyDown={ onKeyDown } />);
        const controlNode = inputAutocomplete.find('input');

        controlNode.simulate('keyDown');

        expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after component was focused', () => {
        const onFocus = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete onFocus={ onFocus } />);
        const controlNode = inputAutocomplete.find('input');

        // simulated event don't actually change focus
        // so we just patch input.getControl
        // @ts-ignore
        (inputAutocomplete.instance().input).getControl = jest.fn().mockReturnValue(document.activeElement);

        controlNode.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after component was blured', (done) => {
        const onBlur = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete onBlur={ onBlur } />);
        const controlNode = inputAutocomplete.find('input');

        inputAutocomplete.setState({ inputFocused: true });
        controlNode.simulate('blur');

        setTimeout(() => {
            expect(onBlur).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should call `onChange` callback', () => {
        const onChange = jest.fn();
        const inputAutocomplete = mount<InputAutocomplete>(<InputAutocomplete onChange={ onChange } />);
        const controlNode = inputAutocomplete.find('input');

        controlNode.simulate('change', { target: { value: 'other value' } });

        expect(onChange).toHaveBeenCalled();
    });

    it('should close popup after item select if closeOnSelect is set', (done) => {
        const inputAutocomplete = mount<InputAutocomplete>(
            <InputAutocomplete closeOnSelect={ true } updateValueOnItemSelect={ false } options={ OPTIONS } />
        );
        // @ts-ignore
        const inputNode = inputAutocomplete.instance().input;

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
        const onChange = jest.fn();

        const inputAutocomplete = mount(
            <InputAutocomplete options={ OPTIONS } onChange={ onChange } />
        );

        inputAutocomplete.find('.menu-item').at(0).simulate('click');

        const firstOptionNode = inputAutocomplete.find('.menu-item').at(0);

        expect(firstOptionNode.props().className).toContain('menu-item_disabled');

        setTimeout(() => {
            expect(onChange).toHaveBeenCalledTimes(0);
            done();
        }, 0);
    });
});
