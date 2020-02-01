/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { mount } from 'enzyme';

import { Select } from './select';
import keyboardCode from '../lib/keyboard-code';

import { SCROLL_TO_CORRECTION } from '../vars';

const { setIsMatched: setMqMatched } = require('../mq/mq');

jest.mock('../mq/mq');

const OPTIONS = [
    {
        value: 1,
        text: 'Vk',
        checkedText: 'Vkontakte'
    },
    {
        value: 2,
        text: 'Fb'
    },
    {
        value: 3,
        text: 'Tw',
        checkedText: 'Twitter'
    }
];
let wrapper;

function renderSelect(props) {
    const select = mount<Select>(<Select { ...props } />);

    wrapper = select;

    const nativeSelectNode = select.find('.select__native-control');
    const buttonNode = select.find('.select-button');
    const { popupNode, menuNode } = getPopupNode(select);
    const hiddenInput = select.find('input');

    return {
        select, nativeSelectNode, popupNode, buttonNode, menuNode, hiddenInput
    };
}

function getPopupNode(select) {
    const popupNode = select.find('.popup');
    const menuNode = popupNode.length > 0 ? popupNode.find('div.select__menu') : null;

    return { popupNode, menuNode };
}

describe('select', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
        setMqMatched(false);
    });

    afterEach(() => {
        wrapper.unmount();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        const { select } = renderSelect({ options: OPTIONS });

        expect(select).toMatchSnapshot();
    });

    it('should render hidden input', () => {
        const { select } = renderSelect({ options: OPTIONS });
        const hiddenInputNode = select.find('input');

        expect(hiddenInputNode.length).toBe(1);
    });

    it('should render hidden input with proper id attr', () => {
        const { select } = renderSelect({ options: OPTIONS, id: 'id' });
        const hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().id).toBe('id');
    });

    it('should render hidden input with proper name attr', () => {
        const { select } = renderSelect({ options: OPTIONS, name: 'name' });
        const hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().name).toBe('name');
    });

    it('should render hidden input with proper value attr', () => {
        const { select } = renderSelect({ options: OPTIONS, value: ['value'] });
        const hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().value).toEqual(['value']);
    });

    it('should render with `label` from props', () => {
        const { select } = renderSelect({ options: OPTIONS, label: 'Label' });
        const topNode = select.find('.select__top');

        expect(topNode.text()).toBe('Label');
    });

    it('should render with `placeholder` from props', () => {
        const { buttonNode } = renderSelect({ options: OPTIONS, placeholder: 'Placeholder' });

        expect(buttonNode.text()).toBe('Placeholder');
    });

    it('should render with `hint` from props', () => {
        const { select } = renderSelect({ options: OPTIONS, hint: 'Hint' });
        const subNode = select.find('.select__sub');

        expect(subNode.text()).toBe('Hint');
    });

    it('should render with `error` from props', () => {
        const { select } = renderSelect({ options: OPTIONS, error: 'Error' });
        const subNode = select.find('.select__sub');

        expect(subNode.text()).toBe('Error');
    });

    it('should show multiple options', () => {
        const checkedOptions = [OPTIONS[1], OPTIONS[2]];
        const selectProps = {
            options: OPTIONS,
            value: [checkedOptions[0].value, checkedOptions[1].value]
        };
        const expectedOptions = checkedOptions.map(option => option.checkedText || option.text).join(', ');
        const { buttonNode } = renderSelect(selectProps);

        expect(buttonNode.text()).toBe(expectedOptions);
    });

    it('should show checkedText of checked options in button if it is undefined', () => {
        const checkedOption = OPTIONS[0];
        const selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        const { buttonNode } = renderSelect(selectProps);

        expect(buttonNode.text()).toBe(checkedOption.checkedText);
    });

    it('should set class on public focus method', () => {
        const { select } = renderSelect({ options: OPTIONS });

        select.instance().focus();
        select.update();

        expect(select.children().props().className).toContain('select_opened');
    });

    it('should unset class on public blur method', () => {
        const { select, menuNode } = renderSelect({ options: OPTIONS });

        select.instance().focus();
        select.update();

        expect(select.children().props().className).toContain('select_opened');

        menuNode.simulate('blur');
        expect(select.children().props().className).toContain('select_opened');
    });

    it('should scroll window to element on public scrollTo method', () => {
        const { select } = renderSelect({ options: OPTIONS });
        const elemTopPosition = select.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        select.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call `onClick` callback after button was clicked', () => {
        const onClick = jest.fn();
        const selectProps = { options: OPTIONS, onClick };
        const { buttonNode } = renderSelect(selectProps);

        buttonNode.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should receive event.target.value on `onFocus` callback', () => {
        const onFocus = jest.fn();
        const { menuNode } = renderSelect({ value: [1, 2], options: OPTIONS, onFocus });

        menuNode.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
        // this line should be used when https://github.com/facebook/jest/issues/1772 will be resolved
        // expect(onFocus).toHaveBeenCalledWith({ target: { value: [1, 2] } });
    });

    it('should receive event.target.value on `onBlur` callback', (done) => {
        const onBlur = jest.fn();
        const { select } = renderSelect({ value: [1, 2], options: OPTIONS, onBlur });

        select.find('.menu').simulate('blur');

        setTimeout(() => {
            expect(onBlur).toHaveBeenCalled();
            expect(onBlur.mock.calls[0][0].target.value).toEqual([1, 2]);
            done();
        }, 0);
    });

    it('should set `checked` class when item is selected', () => {
        const checkedOption = OPTIONS[0];
        const selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        const { select } = renderSelect(selectProps);

        expect(select.children().props().className).toContain('select_checked');
    });

    it('should set `checked` class when item is selected and select type is `radio`', () => {
        const checkedOption = OPTIONS[0];
        const selectProps = {
            mode: 'radio',
            options: OPTIONS,
            value: [checkedOption.value]
        };
        const { select } = renderSelect(selectProps);

        expect(select.children().props().className).toContain('select_checked');
    });

    it('should render popup with options', () => {
        const { select, popupNode } = renderSelect({ options: OPTIONS });

        expect(select.getDOMNode()).toBeDefined();
        expect(popupNode.props().className).toContain('popup');
    });

    it('should set width to popup equal or more than button width', () => {
        const selectProps = {
            options: OPTIONS,
            placeholder: 'Long text placeholder',
            opened: true
        };

        const { popupNode, buttonNode } = renderSelect(selectProps);
        const popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        const buttonWidth = buttonNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBeGreaterThanOrEqual(buttonWidth);
    });

    it('should set popup width equal to button width when equalPopupWidth = true', () => {
        const selectProps = {
            options: [
                {
                    value: 1,
                    text: <div>Very long option text in block element to make select popup strech</div>
                },
                {
                    value: 2,
                    text: (
                        <div>
                            Much, much longer option text in another block element to make select popup strech
                        </div>
                    )
                }
            ],
            equalPopupWidth: true,
            opened: true
        };

        const { popupNode, buttonNode } = renderSelect(selectProps);
        const popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        const buttonWidth = buttonNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBe(buttonWidth);
    });

    it('should call `onFocus` after button was clicked', (done) => {
        const onFocus = jest.fn();
        const { buttonNode } = renderSelect({ options: OPTIONS, onFocus });

        buttonNode.simulate('click');

        setTimeout(() => {
            expect(onFocus).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should call `onBlur` after escape key was pressed', (done) => {
        const onBlur = jest.fn();
        const { buttonNode, menuNode } = renderSelect({ options: OPTIONS, onBlur });

        buttonNode.simulate('click');

        setTimeout(() => {
            menuNode.simulate('keyDown', { which: keyboardCode.ESCAPE });

            setTimeout(() => {
                expect(onBlur).toHaveBeenCalled();
                done();
            }, 0);
        }, 0);
    });

    it('should call `onButtonFocus` after component was focused', () => {
        const onButtonFocus = jest.fn();
        const { buttonNode } = renderSelect({ options: OPTIONS, onButtonFocus });

        buttonNode.simulate('focus');

        expect(onButtonFocus).toHaveBeenCalled();
    });

    it('should call `onButtonBlur` after component was blured', () => {
        const onButtonBlur = jest.fn();
        const { buttonNode } = renderSelect({ options: OPTIONS, onButtonBlur });

        buttonNode.simulate('blur');

        expect(onButtonBlur).toHaveBeenCalled();
    });

    it('should call `onMenuFocus` after component was focused', () => {
        const onMenuFocus = jest.fn();
        const { menuNode } = renderSelect({ options: OPTIONS, onMenuFocus });

        menuNode.simulate('focus');

        expect(onMenuFocus).toHaveBeenCalled();
    });

    it('should call `onMenuBlur` after component was blured', (done) => {
        const onMenuBlur = jest.fn();
        const { menuNode } = renderSelect({ options: OPTIONS, onMenuBlur });

        menuNode.simulate('blur');

        setTimeout(() => {
            expect(onMenuBlur).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should receive event.target.value on `onButtonFocus` callback', (done) => {
        const onButtonFocus = jest.fn();
        const { buttonNode } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonFocus });

        buttonNode.simulate('focus');

        setTimeout(() => {
            expect(onButtonFocus).toHaveBeenCalled();
            expect(onButtonFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
            // expect(onButtonFocus).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should receive event.target.value on `onButtonBlur` callback', (done) => {
        const onButtonBlur = jest.fn();
        const { buttonNode } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonBlur });

        buttonNode.simulate('blur');

        setTimeout(() => {
            expect(onButtonBlur).toHaveBeenCalled();
            expect(onButtonBlur.mock.calls[0][0].target.value).toEqual([1, 2]);
            done();
            // expect(onButtonBlur).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
        }, 0);
    });

    it('should receive event.target.value on `onMenuFocus` callback', (done) => {
        const onMenuFocus = jest.fn();
        const { menuNode } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuFocus });

        menuNode.simulate('focus');

        setTimeout(() => {
            expect(onMenuFocus).toHaveBeenCalled();
            expect(onMenuFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
            // expect(onMenuFocus).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should receive event.target.value on `onMenuBlur` callback', (done) => {
        const onMenuBlur = jest.fn();
        const { menuNode } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuBlur });

        menuNode.simulate('blur');

        setTimeout(() => {
            expect(onMenuBlur).toHaveBeenCalled();
            expect(onMenuBlur.mock.calls[0][0].target.value).toEqual([1, 2]);
            // expect(onMenuBlur).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should call `onChange` callback in custom select after option was clicked', () => {
        const onChange = jest.fn();
        const selectProps = {
            options: OPTIONS,
            onChange
        };
        const { popupNode } = renderSelect(selectProps);
        const firstOptionNode = popupNode.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    // add after decorator update
    it('should call `onClickOutside` callback after click outside of open popup', () => {
        const onClickOutside = jest.fn();
        const selectProps = {
            options: OPTIONS,
            onClickOutside
        };
        const { select } = renderSelect(selectProps);

        // just trigger popup event handler, we don't actually want to test this behavior here
        select.instance().popup.handleWindowClick({});

        expect(onClickOutside).toHaveBeenCalled();
    });

    it('should have `has-value` modificator when given value', () => {
        const { select } = renderSelect({ value: [OPTIONS[0].value], options: OPTIONS });

        expect(select.find('div.select').hasClass('select_has-value')).toBeTruthy();
    });

    it('should not have `has-value` modificator when given no value', () => {
        const { select } = renderSelect({ options: OPTIONS });

        expect(select.find('div.select').hasClass('select_has-value')).toBeFalsy();
    });

    describe('renderPopupOnFocus=true', () => {
        beforeAll(() => {
            jest.useFakeTimers();
        });

        afterAll(() => {
            jest.useRealTimers();
        });

        it('should not render popup', () => {
            const { popupNode } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS
            });

            expect(popupNode.length).toEqual(0);
        });

        it('should render popup after click', () => {
            const { select, buttonNode } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS
            });

            buttonNode.simulate('click');
            jest.runAllTimers();

            const { popupNode } = getPopupNode(select);

            expect(popupNode.length).toEqual(1);
        });

        it('should focus on menu after click', () => {
            const onMenuFocus = jest.fn();

            const { select, buttonNode } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS,
                onMenuFocus
            });

            buttonNode.simulate('click');
            jest.runAllTimers();

            const { menuNode } = getPopupNode(select);

            expect(menuNode.getDOMNode()).toEqual(document.activeElement);
            expect(onMenuFocus).toBeCalled();
        });

        it('should close on escape click', () => {
            const onMenuBlur = jest.fn();

            const { select, buttonNode } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS,
                onMenuBlur
            });

            buttonNode.simulate('click');
            jest.runAllTimers();

            const { menuNode } = getPopupNode(select);

            menuNode.simulate('keyDown', { which: keyboardCode.ESCAPE });
            jest.runAllTimers();
            select.update();

            const { popupNode } = getPopupNode(select);

            expect(popupNode.length).toEqual(0);
            expect(onMenuBlur).toBeCalled();
        });

        it('should auto select first value', () => {
            const onChange = jest.fn();

            const { hiddenInput } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS,
                mode: 'radio',
                onChange
            });

            const expectedValue = [OPTIONS[0].value];
            const actualValue = hiddenInput.prop('value');

            expect(actualValue).toEqual(expectedValue);
            expect(onChange).toBeCalledWith(expectedValue);
        });

        it('should not auto select first value', () => {
            const onChange = jest.fn();
            const expectedValue = [OPTIONS[1].value];

            const { hiddenInput } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS,
                value: expectedValue,
                mode: 'radio',
                onChange
            });

            const actualValue = hiddenInput.prop('value');

            expect(actualValue).toEqual(expectedValue);
            expect(onChange).not.toBeCalled();
        });

        it('should not auto select first value', () => {
            const onChange = jest.fn();
            const expectedValue = [];

            const { hiddenInput } = renderSelect({
                renderPopupOnFocus: true,
                options: OPTIONS,
                onChange
            });

            const actualValue = hiddenInput.prop('value');

            expect(actualValue).toEqual(expectedValue);
            expect(onChange).not.toBeCalled();
        });
    });

    describe('mobile version', () => {
        beforeEach(() => {
            setMqMatched(true);
        });

        it('should render default placeholder text', () => {
            const selectProps = { options: OPTIONS };
            const { nativeSelectNode } = renderSelect(selectProps);
            const optGroup = nativeSelectNode.find('optgroup');

            expect(optGroup.props().label).toBe('Выберите:');
        });

        it('should render placeholder text from props', () => {
            const selectProps = { options: OPTIONS, nativeOptionPlaceholder: 'Select something' };
            const { nativeSelectNode } = renderSelect(selectProps);
            const optGroup = nativeSelectNode.find('optgroup');

            expect(optGroup.props().label).toBe('Select something');
        });

        it('should render popup when mobileMenuMode = popup', () => {
            const selectProps = {
                options: OPTIONS,
                mobileMenuMode: 'popup',
                opened: true
            };
            const { nativeSelectNode, popupNode } = renderSelect(selectProps);

            expect(nativeSelectNode.length).toBe(0);
            expect(popupNode.props().className).toContain('popup');
        });

        it('should call `onFocus` after native select was focused', () => {
            const onFocus = jest.fn();
            const { nativeSelectNode } = renderSelect({ options: OPTIONS, onFocus });

            nativeSelectNode.simulate('focus');

            expect(onFocus).toHaveBeenCalled();
        });

        it('should call `onBlur` after native select was blurred', () => {
            const onBlur = jest.fn();
            const { nativeSelectNode } = renderSelect({ options: OPTIONS, onBlur });

            nativeSelectNode.simulate('blur');

            expect(onBlur).toHaveBeenCalled();
        });
    });
});
