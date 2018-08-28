/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { mount } from 'enzyme';

import Select from './select';
import keyboardCode from '../lib/keyboard-code';

import { SCROLL_TO_CORRECTION } from '../vars';
import { setIsMatched as setMqMatched } from '../mq/mq';

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
    let select = mount(<Select { ...props } />);

    wrapper = select;

    let nativeSelectNode = select.find('.select__native-control');
    let buttonNode = select.find('.select-button');
    let { popupNode, menuNode } = getPopupNode(select);

    return {
        select, nativeSelectNode, popupNode, buttonNode, menuNode
    };
}

function getPopupNode(select) {
    let popupNode = select.find('.popup');
    let menuNode = popupNode.length > 0 ? popupNode.find('div.select__menu') : null;

    return { popupNode, menuNode };
}

describe('select', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
        setMqMatched(false);
    });

    afterEach(() => {
        wrapper.unmount();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        let { select } = renderSelect({ options: OPTIONS });

        expect(select).toMatchSnapshot();
    });

    it('should render opened select', () => {
        let { select } = renderSelect({ options: OPTIONS, opened: true });

        expect(select).toMatchSnapshot();
    });

    it('should render hidden input', () => {
        let { select } = renderSelect({ options: OPTIONS });
        let hiddenInputNode = select.find('input');

        expect(hiddenInputNode.length).toBe(1);
    });

    it('should render hidden input with proper id attr', () => {
        let { select } = renderSelect({ options: OPTIONS, id: 'id' });
        let hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().id).toBe('id');
    });

    it('should render hidden input with proper name attr', () => {
        let { select } = renderSelect({ options: OPTIONS, name: 'name' });
        let hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().name).toBe('name');
    });

    it('should render hidden input with proper value attr', () => {
        let { select } = renderSelect({ options: OPTIONS, value: ['value'] });
        let hiddenInputNode = select.find('input');

        expect(hiddenInputNode.props().value).toEqual(['value']);
    });

    it('should render with `label` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, label: 'Label' });
        let topNode = select.find('.select__top');

        expect(topNode.text()).toBe('Label');
    });

    it('should render with `placeholder` from props', () => {
        let { buttonNode } = renderSelect({ options: OPTIONS, placeholder: 'Placeholder' });

        expect(buttonNode.text()).toBe('Placeholder');
    });

    it('should render with `hint` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, hint: 'Hint' });
        let subNode = select.find('.select__sub');

        expect(subNode.text()).toBe('Hint');
    });

    it('should render with `error` from props', () => {
        let { select } = renderSelect({ options: OPTIONS, error: 'Error' });
        let subNode = select.find('.select__sub');

        expect(subNode.text()).toBe('Error');
    });

    it('should show multiple options', () => {
        let checkedOptions = [OPTIONS[1], OPTIONS[2]];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOptions[0].value, checkedOptions[1].value]
        };
        let expectedOptions = checkedOptions.map(option => option.checkedText || option.text).join(', ');
        let { buttonNode } = renderSelect(selectProps);

        expect(buttonNode.text()).toBe(expectedOptions);
    });

    it('should show checkedText of checked options in button if it is undefined', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { buttonNode } = renderSelect(selectProps);

        expect(buttonNode.text()).toBe(checkedOption.checkedText);
    });

    it('should set class on public focus method', () => {
        let { select } = renderSelect({ options: OPTIONS });

        select.instance().focus();
        select.update();

        expect(select.children().props().className).toContain('select_opened');
    });

    it('should unset class on public blur method', () => {
        let { select } = renderSelect({ options: OPTIONS });

        select.instance().focus();
        select.update();

        let { menuNode } = getPopupNode(select);

        expect(select.children().props().className).toContain('select_opened');

        menuNode.simulate('blur');
        expect(select.children().props().className).toContain('select_opened');
    });

    it('should scroll window to element on public scrollTo method', () => {
        let { select } = renderSelect({ options: OPTIONS });
        let elemTopPosition = select.getDOMNode().getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        select.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it('should call `onClick` callback after button was clicked', () => {
        let onClick = jest.fn();
        let selectProps = { options: OPTIONS, onClick };
        let { buttonNode } = renderSelect(selectProps);

        buttonNode.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should receive event.target.value on `onFocus` callback', () => {
        let onFocus = jest.fn();
        let { menuNode } = renderSelect({
            value: [1, 2],
            options: OPTIONS,
            onFocus,
            opened: true
        });
        menuNode.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
        expect(onFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
        // this line should be used when https://github.com/facebook/jest/issues/1772 will be resolved
        // expect(onFocus).toHaveBeenCalledWith({ target: { value: [1, 2] } });
    });

    it('should receive event.target.value on `onBlur` callback', (done) => {
        let onBlur = jest.fn();
        let { select } = renderSelect({ value: [1, 2], options: OPTIONS, onBlur });

        select.find('.menu').simulate('blur');

        setTimeout(() => {
            expect(onBlur).toHaveBeenCalled();
            expect(onBlur.mock.calls[0][0].target.value).toEqual([1, 2]);
            done();
        }, 0);
    });

    it('should set `checked` class when item is selected', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { select } = renderSelect(selectProps);

        expect(select.children().props().className).toContain('select_checked');
    });

    it('should set `checked` class when item is selected and select type is `radio`', () => {
        let checkedOption = OPTIONS[0];
        let selectProps = {
            mode: 'radio',
            options: OPTIONS,
            value: [checkedOption.value]
        };
        let { select } = renderSelect(selectProps);

        expect(select.children().props().className).toContain('select_checked');
    });

    it('should render popup with options', () => {
        let { select, popupNode } = renderSelect({ options: OPTIONS });

        expect(select.getDOMNode()).toBeDefined();
        expect(popupNode.props().className).toContain('popup');
    });

    it('should set width to popup equal or more than button width', () => {
        let selectProps = {
            options: OPTIONS,
            placeholder: 'Long text placeholder',
            opened: true
        };

        let { popupNode, buttonNode } = renderSelect(selectProps);
        let popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        let buttonWidth = buttonNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBeGreaterThanOrEqual(buttonWidth);
    });

    it('should set popup width equal to button width when equalPopupWidth = true', () => {
        let selectProps = {
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

        let { popupNode, buttonNode } = renderSelect(selectProps);
        let popupWidth = popupNode.getDOMNode().getBoundingClientRect().width;
        let buttonWidth = buttonNode.getDOMNode().getBoundingClientRect().width;

        expect(popupWidth).toBe(buttonWidth);
    });

    it('should call `onFocus` after button was clicked', () => {
        jest.useFakeTimers();

        let onFocus = jest.fn();
        let { buttonNode } = renderSelect({ options: OPTIONS, onFocus });

        buttonNode.simulate('click');
        jest.runAllTimers();

        expect(onFocus).toHaveBeenCalled();

        jest.useRealTimers();
    });

    it('should call `onBlur` after escape key was pressed', () => {
        jest.useFakeTimers();

        let onBlur = jest.fn();
        let { select, buttonNode } = renderSelect({ options: OPTIONS, onBlur });

        buttonNode.simulate('click');
        jest.runAllTimers();

        let { menuNode } = getPopupNode(select);

        menuNode.simulate('keyDown', { which: keyboardCode.ESCAPE });
        jest.runAllTimers();

        expect(onBlur).toHaveBeenCalled();

        jest.useRealTimers();
    });

    it('should call `onButtonFocus` after component was focused', () => {
        let onButtonFocus = jest.fn();
        let { buttonNode } = renderSelect({ options: OPTIONS, onButtonFocus });

        buttonNode.simulate('focus');

        expect(onButtonFocus).toHaveBeenCalled();
    });

    it('should call `onButtonBlur` after component was blured', () => {
        let onButtonBlur = jest.fn();
        let { buttonNode } = renderSelect({ options: OPTIONS, onButtonBlur });

        buttonNode.simulate('blur');

        expect(onButtonBlur).toHaveBeenCalled();
    });

    it('should call `onMenuFocus` after component was focused', () => {
        jest.useFakeTimers();
        let onMenuFocus = jest.fn();
        let { buttonNode } = renderSelect({ options: OPTIONS, onMenuFocus });

        buttonNode.simulate('click');
        jest.runAllTimers();

        expect(onMenuFocus).toHaveBeenCalled();
        jest.useRealTimers();
    });

    it('should call `onMenuBlur` after component was blured', () => {
        jest.useFakeTimers();

        let onMenuBlur = jest.fn();
        let { select, buttonNode } = renderSelect({ options: OPTIONS, onMenuBlur });

        buttonNode.simulate('click');
        jest.runAllTimers();

        const { menuNode } = getPopupNode(select);

        menuNode.getDOMNode().blur();
        jest.runAllTimers();

        expect(onMenuBlur).toHaveBeenCalled();

        jest.useRealTimers();
    });

    it('should receive event.target.value on `onButtonFocus` callback', () => {
        jest.useFakeTimers();
        let onButtonFocus = jest.fn();
        let { buttonNode } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonFocus });
        jest.runAllTimers();

        buttonNode.simulate('focus');

        expect(onButtonFocus).toHaveBeenCalled();
        expect(onButtonFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
        // expect(onButtonFocus).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
        jest.useRealTimers();
    });

    it('should receive event.target.value on `onButtonBlur` callback', () => {
        jest.useFakeTimers();

        let onButtonBlur = jest.fn();
        let { buttonNode } = renderSelect({ value: [1, 2], options: OPTIONS, onButtonBlur });

        buttonNode.simulate('blur');

        expect(onButtonBlur).toHaveBeenCalled();
        expect(onButtonBlur.mock.calls[0][0].target.value).toEqual([1, 2]);

        jest.useRealTimers();
    });

    it('should receive event.target.value on `onMenuFocus` callback', (done) => {
        let onMenuFocus = jest.fn();
        let { menuNode } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuFocus });

        menuNode.simulate('focus');

        setTimeout(() => {
            expect(onMenuFocus).toHaveBeenCalled();
            expect(onMenuFocus.mock.calls[0][0].target.value).toEqual([1, 2]);
            // expect(onMenuFocus).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should receive event.target.value on `onMenuBlur` callback', (done) => {
        let onMenuBlur = jest.fn();
        let { menuNode } = renderSelect({ value: [1, 2], options: OPTIONS, onMenuBlur });

        menuNode.simulate('blur');

        setTimeout(() => {
            expect(onMenuBlur).toHaveBeenCalled();
            expect(onMenuBlur.mock.calls[0][0].target.value).toEqual([1, 2]);
            // expect(onMenuBlur).toHaveBeenCalledWith(expect.objectContaining({ target: { value: [1, 2] } }));
            done();
        }, 0);
    });

    it('should call `onChange` callback in custom select after option was clicked', () => {
        let onChange = jest.fn();
        let selectProps = {
            options: OPTIONS,
            onChange,
            opened: true
        };
        let { popupNode } = renderSelect(selectProps);
        let firstOptionNode = popupNode.find('.menu-item').at(0);

        firstOptionNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    // add after decorator update
    it('should call `onClickOutside` callback after click outside of open popup', () => {
        let onClickOutside = jest.fn();
        let selectProps = {
            options: OPTIONS,
            onClickOutside,
            opened: true
        };
        let { select } = renderSelect(selectProps);

        // just trigger popup event handler, we don't actually want to test this behavior here
        select.instance().popup.handleWindowClick({});

        expect(onClickOutside).toHaveBeenCalled();
    });


    describe('mobile version', () => {
        beforeEach(() => {
            setMqMatched(true);
        });

        it('should render default placeholder text', () => {
            let selectProps = { options: OPTIONS };
            let { nativeSelectNode } = renderSelect(selectProps);
            let optGroup = nativeSelectNode.find('optgroup');

            expect(optGroup.props().label).toBe('Выберите:');
        });

        it('should render placeholder text from props', () => {
            let selectProps = { options: OPTIONS, placeholder: 'Select something' };
            let { nativeSelectNode } = renderSelect(selectProps);
            let optGroup = nativeSelectNode.find('optgroup');

            expect(optGroup.props().label).toBe('Select something');
        });

        it('should render popup when mobileMenuMode = popup', () => {
            let selectProps = {
                options: OPTIONS,
                mobileMenuMode: 'popup',
                opened: true
            };
            let { nativeSelectNode, popupNode } = renderSelect(selectProps);

            expect(nativeSelectNode.length).toBe(0);
            expect(popupNode.props().className).toContain('popup');
        });

        it('should call `onFocus` after native select was focused', () => {
            let onFocus = jest.fn();
            let { nativeSelectNode } = renderSelect({ options: OPTIONS, onFocus });

            nativeSelectNode.simulate('focus');

            expect(onFocus).toHaveBeenCalled();
        });

        it('should call `onBlur` after native select was blurred', () => {
            let onBlur = jest.fn();
            let { nativeSelectNode } = renderSelect({ options: OPTIONS, onBlur });

            nativeSelectNode.simulate('blur');

            expect(onBlur).toHaveBeenCalled();
        });
    });
});
