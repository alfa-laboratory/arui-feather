/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Button } from './button';

describe('button', () => {
    it('should set/unset class on button pressed/unpressed', () => {
        const button = mount(<Button>Button-example</Button>);

        button.simulate('mouseDown');
        expect(button.getDOMNode().className).toContain('button_pressed');

        button.simulate('mouseUp');
        expect(button.getDOMNode().className).not.toContain('button_pressed');
    });

    it('should unset pressed class on mouse out', () => {
        const button = mount(<Button>Button-example</Button>);

        button.simulate('mouseDown');
        expect(button.getDOMNode().className).toContain('button_pressed');

        button.simulate('mouseOut');
        expect(button.getDOMNode().className).not.toContain('button_pressed');
    });

    it('should render without problems', () => {
        const button = mount(<Button>Button-example</Button>);

        expect(button).toMatchSnapshot();
    });

    it('should set/unset class on button focused/unfocused', () => {
        const button = mount(<Button>Button-example</Button>);

        button.simulate('focus');
        expect(button.getDOMNode().className).toContain('button_focused');

        button.simulate('blur');
        expect(button.getDOMNode().className).not.toContain('button_focused');
    });

    it('should set "focused" class when focused=true', () => {
        const button = mount(<Button focused={ true } >Button-example</Button>);

        expect(button.getDOMNode().className).toContain('button_focused');
    });

    it('should set/unset class on button hovered/unhovered', () => {
        const button = mount(<Button>Button-example</Button>);

        button.simulate('mouseEnter');
        expect(button.getDOMNode().className).toContain('button_hovered');

        button.simulate('mouseLeave');
        expect(button.getDOMNode().className).not.toContain('button_hovered');
    });

    it('should not set class `hovered` on disabled button', () => {
        const button = mount(<Button disabled={ true }>Button-example</Button>);

        button.simulate('mouseEnter');

        expect(button.getDOMNode().className).not.toContain('button_hovered');
    });

    it('should call `onClick` callback after button was clicked', () => {
        const onClick = jest.fn();
        const button = mount(<Button onClick={ onClick } />);

        button.simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should unset class `hovered` and `focused` on disabled button', () => {
        const button = mount(<Button />);

        button.simulate('mouseEnter');
        button.simulate('focus');

        expect(button.getDOMNode().className).toContain('button_hovered');
        expect(button.getDOMNode().className).toContain('button_focused');

        button.setProps({ disabled: true });

        expect(button.getDOMNode().className).not.toContain('button_hovered');
        expect(button.getDOMNode().className).not.toContain('button_focused');
    });

    it('should call `onFocus` callback after button was focused', () => {
        const onFocus = jest.fn();
        const button = mount(<Button onFocus={ onFocus } />);

        button.simulate('focus');

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call `onBlur` callback after button was blured', () => {
        const onBlur = jest.fn();
        const button = mount(<Button onBlur={ onBlur } />);

        button.simulate('blur');

        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseEnter` callback after button was hovered', () => {
        const onMouseEnter = jest.fn();
        const button = mount(<Button onMouseEnter={ onMouseEnter } />);

        button.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseLeave` callback after button was leaved by cursor', () => {
        const onMouseLeave = jest.fn();
        const button = mount(<Button onMouseLeave={ onMouseLeave } />);

        button.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseDown` callback after button was pressed', () => {
        const onMouseDown = jest.fn();
        const button = mount(<Button onMouseDown={ onMouseDown } />);

        button.simulate('mouseDown');

        expect(onMouseDown).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseUp` callback after button was unpressed', () => {
        const onMouseUp = jest.fn();
        const button = mount(<Button onMouseUp={ onMouseUp } />);

        button.simulate('mouseUp');

        expect(onMouseUp).toHaveBeenCalledTimes(1);
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const button = mount<Button>(<Button />);

        const node = button.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
