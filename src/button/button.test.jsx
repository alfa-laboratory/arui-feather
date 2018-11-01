/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Button from './button';

describe('button', () => {
    it('should set/unset class on button pressed/unpressed', () => {
        let button = mount(<Button>Button-example</Button>);

        button.simulate('mouseDown');
        expect(button.getDOMNode().className).toContain('button_pressed');

        button.simulate('mouseUp');
        expect(button.getDOMNode().className).not.toContain('button_pressed');
    });

    it('should unset pressed class on mouse out', () => {
        let button = mount(<Button>Button-example</Button>);

        button.simulate('mouseDown');
        expect(button.getDOMNode().className).toContain('button_pressed');

        button.simulate('mouseOut');
        expect(button.getDOMNode().className).not.toContain('button_pressed');
    });

    it('should render without problems', () => {
        let button = mount(<Button>Button-example</Button>);

        expect(button).toMatchSnapshot();
    });

    it('should set/unset class on button focused/unfocused', () => {
        let button = mount(<Button>Button-example</Button>);

        button.simulate('focus');
        expect(button.getDOMNode().className).toContain('button_focused');

        button.simulate('blur');
        expect(button.getDOMNode().className).not.toContain('button_focused');
    });

    it('should set "focused" class when focused=true', () => {
        let button = mount(<Button focused={ true } >Button-example</Button>);

        expect(button.getDOMNode().className).toContain('button_focused');
    });

    it('should set/unset class on button hovered/unhovered', () => {
        let button = mount(<Button>Button-example</Button>);

        button.simulate('mouseEnter');
        expect(button.getDOMNode().className).toContain('button_hovered');

        button.simulate('mouseLeave');
        expect(button.getDOMNode().className).not.toContain('button_hovered');
    });

    it('should not set class `hovered` on disabled button', () => {
        let button = mount(<Button disabled={ true }>Button-example</Button>);

        button.simulate('mouseEnter');

        expect(button.getDOMNode().className).not.toContain('button_hovered');
    });

    it('should call `onClick` callback after button was clicked', () => {
        let onClick = jest.fn();
        let button = mount(<Button onClick={ onClick } />);

        button.simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should unset class `hovered` and `focused` on disabled button', () => {
        let button = mount(<Button />);

        button.simulate('mouseEnter');
        button.simulate('focus');

        expect(button.getDOMNode().className).toContain('button_hovered');
        expect(button.getDOMNode().className).toContain('button_focused');

        button.setProps({ disabled: true });

        expect(button.getDOMNode().className).not.toContain('button_hovered');
        expect(button.getDOMNode().className).not.toContain('button_focused');
    });

    it('should call `onFocus` callback after button was focused', () => {
        let onFocus = jest.fn();
        let button = mount(<Button onFocus={ onFocus } />);

        button.simulate('focus');

        expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call `onBlur` callback after button was blured', () => {
        let onBlur = jest.fn();
        let button = mount(<Button onBlur={ onBlur } />);

        button.simulate('blur');

        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseEnter` callback after button was hovered', () => {
        let onMouseEnter = jest.fn();
        let button = mount(<Button onMouseEnter={ onMouseEnter } />);

        button.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseLeave` callback after button was leaved by cursor', () => {
        let onMouseLeave = jest.fn();
        let button = mount(<Button onMouseLeave={ onMouseLeave } />);

        button.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseDown` callback after button was pressed', () => {
        let onMouseDown = jest.fn();
        let button = mount(<Button onMouseDown={ onMouseDown } />);

        button.simulate('mouseDown');

        expect(onMouseDown).toHaveBeenCalledTimes(1);
    });

    it('should call `onMouseUp` callback after button was unpressed', () => {
        let onMouseUp = jest.fn();
        let button = mount(<Button onMouseUp={ onMouseUp } />);

        button.simulate('mouseUp');

        expect(onMouseUp).toHaveBeenCalledTimes(1);
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let button = mount(<Button />);

        let node = button.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
