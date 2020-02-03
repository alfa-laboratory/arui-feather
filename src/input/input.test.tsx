/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Input } from './input';
import MaskedInput from '../masked-input';
import IconSearch from '../icon/action/search';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('input', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        window.scrollTo = originalWindowScrollTo;
    });

    it('should unset class on input blur', () => {
        const input = shallow(<Input />);
        const controlNode = input.find('input');

        controlNode.simulate('focus');
        expect(input.props().className).toContain('input_focused');

        controlNode.simulate('blur');
        expect(input.props().className).not.toContain('input_focused');
    });

    it('should render with disabled class', () => {
        const input = shallow(<Input disabled={ true } />);

        expect(input.props().className).toContain('input_disabled');
    });

    it('should unset class on blur event', () => {
        const input = mount(<Input />);

        input.find('input').simulate('focus');

        expect(input.children().props().className).toContain('input_focused');

        input.find('input').simulate('blur');

        expect(input.children().props().className).not.toContain('input_focused');
    });

    it('should set caret to end of input on public focus method', () => {
        const value = 'test';
        const input = mount<Input>(<Input value={ value } />);

        input.instance().focus();

        expect(input.instance().getControl().selectionStart).toBe(value.length);
        expect(input.instance().getControl().selectionEnd).toBe(value.length);
    });

    it('should set class on focus event', () => {
        const input = mount(<Input />);

        input.find('input').simulate('focus');

        expect(input.children().props().className).toContain('input_focused');
    });

    it('should scroll window to element on public `scrollTo` method', () => {
        const input = mount<Input>(<Input />);
        const elemTopPosition = input.getDOMNode().getBoundingClientRect().top;
        const elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        input.instance().scrollTo();

        expect(window.scrollTo).toHaveBeenCalledWith(0, elemScrollTo);
    });

    it(
        'should not set selection when `setSelectionRange` method was called on input with type `email`',
        () => {
            const input = mount<Input>(<Input value='test' type='email' />);

            const setSelectionRange = jest.fn();

            input.instance().getControl().setSelectionRange = setSelectionRange;
            input.instance().focus();

            input.instance().setSelectionRange();
            expect(setSelectionRange).not.toHaveBeenCalled();
        }
    );

    it(
        'should set selection to all value when `setSelectionRange` method was called without parameters',
        () => {
            const input = mount<Input>(<Input value='test' />);
            const setSelectionRange = jest.fn();

            input.instance().getControl().setSelectionRange = setSelectionRange;

            input.instance().focus();

            input.instance().setSelectionRange();
            expect(setSelectionRange).toHaveBeenCalledWith(0, 'test'.length);
        }
    );

    it(
        'should set selection when setSelection range was called with parameters',
        () => {
            const input = mount<Input>(<Input value='test' />);
            const setSelectionRange = jest.fn();

            input.instance().getControl().setSelectionRange = setSelectionRange;

            input.instance().focus();

            input.instance().setSelectionRange(0, 2);
            expect(setSelectionRange).toHaveBeenCalledWith(0, 2);

            input.instance().setSelectionRange(2, 4);
            expect(setSelectionRange).toHaveBeenCalledWith(2, 4);
        }
    );

    it('should render without problems', () => {
        const input = shallow(<Input />);

        expect(input).toBeDefined();
        expect(input).toMatchSnapshot();
        expect(input.props().className).toContain('input');
    });

    it('should set focused className from props', () => {
        const input = shallow(<Input focused={ true } />);

        expect(input.props().className).toContain('input_focused');
    });

    it('should render with `label` from props', () => {
        const input = shallow(<Input label='Label' />);
        const topNode = input.find('.input__top');

        expect(topNode).toBeDefined();
        expect(topNode.text()).toBe('Label');
    });

    it('should render with `placeholder` from props', () => {
        const input = shallow(<Input placeholder='Placeholder' />);
        const controlNode = input.find('input');

        expect(controlNode.props().placeholder).toBe('Placeholder');
    });

    it('should render with `hint` from props', () => {
        const input = shallow(<Input hint='Hint' />);
        const subNode = input.find('.input__sub');

        expect(subNode).toBeDefined();
        expect(subNode.text()).toBe('Hint');
    });

    it('should render with `error` from props', () => {
        const input = shallow(<Input error='Error' />);
        const subNode = input.find('.input__sub');

        expect(subNode).toBeDefined();
        expect(subNode.text()).toBe('Error');
    });

    it('should render with `off` autocomplete attribute', () => {
        const input = shallow(<Input autocomplete={ false } />);
        const controlNode = input.find('input');

        expect(controlNode.props().autoComplete).toBe('off');
    });

    it('should render with `on` autocomplete attribute', () => {
        const input = shallow(<Input autocomplete={ true } />);
        const controlNode = input.find('input');

        expect(controlNode.props().autoComplete).toBe('on');
    });

    it('should render string autocomplete attribute', () => {
        const input = shallow(<Input autocomplete='email' />);
        const controlNode = input.find('input');

        expect(controlNode.props().autoComplete).toBe('email');
    });

    it('should render with `data-test-id` attribute if it is set', () => {
        const input = mount(<Input data-test-id='some value' />);
        const rootNode = input.getDOMNode();

        expect(rootNode.getAttribute('data-test-id')).toBe('some value');
    });

    it('should set value from props', () => {
        const input = shallow(<Input value='text' />);
        const controlNode = input.find('input');

        expect(controlNode.props().value).toBe('text');
    });

    it('should change the state value when props is not defined', () => {
        const input = mount(<Input />);
        const controlNode = input.find('input');

        controlNode.simulate('change', { target: { value: 'other value' } });

        expect(input.find('input').props().value).toBe('other value');
    });

    it('should call `onFocus` callback after input was focused', () => {
        const onFocus = jest.fn();
        const input = mount(<Input onFocus={ onFocus } />);

        input.find('input').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onClick` callback after input was clicked', () => {
        const onClick = jest.fn();
        const input = shallow(<Input onClick={ onClick } />);
        const controlNode = input.find('input');

        controlNode.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        const onKeyDown = jest.fn();
        const input = shallow(<Input onKeyDown={ onKeyDown } />);
        const controlNode = input.find('input');

        controlNode.simulate('keyDown');

        expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after input was blured', () => {
        const onBlur = jest.fn();
        const input = mount(<Input onBlur={ onBlur } />);

        input.find('input').simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onChange` callback', () => {
        const onChange = jest.fn();
        const input = shallow(<Input onChange={ onChange } />);
        const controlNode = input.find('input');

        controlNode.simulate('change', { target: { value: 'other value' } });

        expect(onChange).toHaveBeenCalled();
    });

    it('should render with clear element', () => {
        const input = shallow(<Input clear={ true } value='text' />);
        const clearNode = input.find('.input__clear');

        expect(clearNode.length).toBe(1);
    });

    it('should call `onClearClick` callback on clear icon click', () => {
        const onClearClick = jest.fn();
        const input = mount(<Input clear={ true } onClearClick={ onClearClick } />);
        const controlNode = input.find('input');

        controlNode.simulate('change', { target: { value: 'value' } });
        const clearNode = input.find('.input__clear').at(0);

        clearNode.simulate('click');

        expect(onClearClick).toHaveBeenCalled();
    });

    it('should clear value after clear icon click', () => {
        const input = mount(<Input clear={ true } />);
        const controlNode = input.find('input');

        controlNode.simulate('change', { target: { value: 'value' } });
        const clearNode = input.find('.input__clear').at(0);

        clearNode.simulate('click');

        expect(controlNode.props().value).toBe('');
    });

    it('should call `onChange` listener after clear icon click', () => {
        const onChange = jest.fn();
        const input = mount(
            <Input
                value='text'
                clear={ true }
                onChange={ onChange }
            />
        );
        const clearNode = input.find('.input__clear').at(0);

        clearNode.simulate('click');

        expect(onChange).toHaveBeenCalled();
    });

    it('should render with icon', () => {
        const input = shallow(<Input icon={ <IconSearch /> } />);
        const iconNode = input.find('.input__icon');

        expect(iconNode.length).toBe(1);
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const input = mount<Input>(<Input />);

        const node = input.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
        expect(node).toBe(input.getDOMNode());
    });

    // it('should format masked value with custom formatter', () => {
    //     const cyrillic = {
    //         c: {
    //             validate(char) { return /^[ЁёА-Яа-я]$/.it(char); }
    //         }
    //     };
    //     let input = mount(
    //         <Input maskFormatCharacters={ cyrillic } mask='c 111 cc' value='12-3hjhkА456ИТг' />
    //     );
    //     let controlNode = input.find('input');
    //
    //     expect(controlNode.value).toBe('А 456 ИТ');
    // });

    it(
        'should return `HTMLInputElement` when `getControl` method called',
        () => {
            const input = mount<Input>(<Input />);
            const controlNode = input.instance().getControl();

            expect(controlNode).toBeInstanceOf(HTMLInputElement);
        }
    );

    it(
        'should return `HTMLInputElement` when `getControl` method called and mask is set',
        () => {
            const input = mount<Input>(<Input mask='111' />);
            const controlNode = input.instance().getControl();

            expect(controlNode).toBeInstanceOf(HTMLInputElement);
        }
    );

    it(
        'should return null when `getMaskedInputInstance` method is called and mask is not set',
        () => {
            const input = shallow<Input>(<Input />);
            const maskedInputInstance = input.instance().getMaskedInputInstance();

            expect(maskedInputInstance).toBeNull();
        }
    );

    it(
        'should return MaskedInput instance when getMaskedInputInstance method is called and mask is set',
        () => {
            const input = mount<Input>(<Input mask='111' />);
            const maskedInputInstance = input.instance().getMaskedInputInstance();

            expect(maskedInputInstance).toBeInstanceOf(MaskedInput);
        }
    );

    it('should call `onTouchStart` callback after input was touched', () => {
        const onTouchStart = jest.fn();
        const input = shallow(<Input onTouchStart={ onTouchStart } />);
        const controlNode = input.find('input');

        controlNode.simulate('touchStart');

        expect(onTouchStart).toHaveBeenCalled();
    });

    it(
        'should call `onTouchEnd` callback after input was released on touch',
        () => {
            const onTouchEnd = jest.fn();
            const input = shallow(<Input onTouchEnd={ onTouchEnd } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchEnd');

            expect(onTouchEnd).toHaveBeenCalled();
        }
    );

    it(
        'should call `onTouchCancel` callback after input was disrupted on touch',
        () => {
            const onTouchCancel = jest.fn();
            const input = shallow(<Input onTouchCancel={ onTouchCancel } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchCancel');

            expect(onTouchCancel).toHaveBeenCalled();
        }
    );

    it(
        'should call `onTouchMove` callback after input was touched and moved',
        () => {
            const onTouchMove = jest.fn();
            const input = shallow(<Input onTouchMove={ onTouchMove } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchMove');

            expect(onTouchMove).toHaveBeenCalled();
        }
    );

    it(
        'should call `onTouchStart` callback with argument as SyntheticEvent and type \'touchstart\'',
        () => {
            const onTouchStart = jest.fn();
            const input = mount(<Input onTouchStart={ onTouchStart } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchStart');

            expect(onTouchStart).toHaveBeenCalled();
            expect(onTouchStart).toHaveBeenCalledWith(expect.objectContaining({ type: 'touchstart' }));
        }
    );

    it(
        'should call `onTouchEnd` callback with argument as SyntheticEvent and type \'touchend\'',
        () => {
            const onTouchEnd = jest.fn();
            const input = mount(<Input onTouchEnd={ onTouchEnd } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchEnd');
            expect(onTouchEnd).toHaveBeenCalled();
            expect(onTouchEnd).toHaveBeenCalledWith(expect.objectContaining({ type: 'touchend' }));
        }
    );

    it(
        'should call `onTouchMove` callback with argument as SyntheticEvent and type \'touchmove\'',
        () => {
            const onTouchMove = jest.fn();
            const input = mount(<Input onTouchMove={ onTouchMove } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchMove');
            expect(onTouchMove).toHaveBeenCalled();
            expect(onTouchMove).toHaveBeenCalledWith(expect.objectContaining({ type: 'touchmove' }));
        }
    );

    it(
        'should call `onTouchCancel` callback with argument as SyntheticEvent and type \'touchcancel\'',
        () => {
            const onTouchCancel = jest.fn();
            const input = mount(<Input onTouchCancel={ onTouchCancel } />);
            const controlNode = input.find('input');

            controlNode.simulate('touchCancel');
            expect(onTouchCancel).toHaveBeenCalled();
            expect(onTouchCancel).toHaveBeenCalledWith(expect.objectContaining({ type: 'touchcancel' }));
        }
    );

    it(
        'should call `enableMouseWheel` and `disableMouseWheel` after focus and blur',
        () => {
            const input = mount<Input>(<Input />);
            const controlNode = input.find('input');

            jest.spyOn(input.instance(), 'enableMouseWheel');
            jest.spyOn(input.instance(), 'disableMouseWheel');

            controlNode.simulate('focus');
            expect(input.instance().enableMouseWheel).toHaveBeenCalled();

            controlNode.simulate('blur');
            expect(input.instance().disableMouseWheel).toHaveBeenCalled();
        }
    );

    it(
        'should call `resetError` after focus',
        () => {
            const input = mount<Input>(<Input />);
            const controlNode = input.find('input');
            // @ts-ignore
            jest.spyOn(input.instance(), 'resetError');

            controlNode.simulate('focus');
            // @ts-ignore
            expect(input.instance().resetError).toHaveBeenCalled();
        }
    );
});
