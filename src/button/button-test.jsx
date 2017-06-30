/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Button from './button';

describe('button', () => {
    afterEach(cleanUp);

    it('should set/unset class on button pressed/unpressed', () => {
        let button = render(<Button>Button-example</Button>);

        simulate(button.node, 'mouseDown');
        expect(button.node).to.have.class('button_pressed');

        simulate(button.node, 'mouseUp');
        expect(button.node).to.not.have.class('button_pressed');
    });

    it('should render without problems', () => {
        let button = render(<Button>Button-example</Button>);

        expect(button.node).to.exist;
        expect(button.node).to.have.text('Button-example');
        expect(button.node).to.have.class('button');
    });

    it('should set/unset class on button focused/unfocused', () => {
        let button = render(<Button>Button-example</Button>);

        simulate(button.node, 'focus');
        expect(button.node).to.have.class('button_focused');

        simulate(button.node, 'blur');
        expect(button.node).to.not.have.class('button_focused');
    });

    it('should set "focused" class when focused=true', () => {
        let button = render(<Button focused={ true } >Button-example</Button>);

        expect(button.node).to.have.class('button_focused');
    });

    it('should set/unset class on button hovered/unhovered', () => {
        let button = render(<Button>Button-example</Button>);

        simulate(button.node, 'mouseEnter');
        expect(button.node).to.have.class('button_hovered');

        simulate(button.node, 'mouseLeave');
        expect(button.node).to.not.have.class('button_hovered');
    });

    it('should not set class `hovered` on disabled button', () => {
        let button = render(<Button disabled={ true }>Button-example</Button>);

        simulate(button.node, 'mouseEnter');

        expect(button.node).to.not.have.class('button_hovered');
    });

    it('should call `onClick` callback after button was clicked', () => {
        let onClick = chai.spy();
        let button = render(<Button onClick={ onClick } />);

        button.node.click();

        expect(onClick).to.have.been.called.once;
    });

    it('should unset class `hovered` and `focused` on disabled button', () => {
        let button = render(<Button />);

        simulate(button.node, 'mouseEnter');
        button.instance.focus();

        expect(button.node).to.have.class('button_hovered');
        expect(button.node).to.have.class('button_focused');

        button = render(<Button disabled={ true } />);

        expect(button.node).to.not.have.class('button_hovered');
        expect(button.node).to.not.have.class('button_focused');
    });

    it('should call `onFocus` callback after button was focused', (done) => {
        let onFocus = chai.spy();
        let button = render(<Button onFocus={ onFocus } />);

        button.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after button was blured', (done) => {
        let onBlur = chai.spy();
        let button = render(<Button onBlur={ onBlur } />);

        button.instance.focus();

        setTimeout(() => {
            button.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onMouseEnter` callback after button was hovered', () => {
        let onMouseEnter = chai.spy();
        let button = render(<Button onMouseEnter={ onMouseEnter } />);

        simulate(button.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.called.once;
    });

    it('should call `onMouseLeave` callback after button was leaved by cursor', () => {
        let onMouseLeave = chai.spy();
        let button = render(<Button onMouseLeave={ onMouseLeave } />);

        simulate(button.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.called.once;
    });

    it('should call `onMouseDown` callback after button was pressed', () => {
        let onMouseDown = chai.spy();
        let button = render(<Button onMouseDown={ onMouseDown } />);

        simulate(button.node, 'mouseDown');

        expect(onMouseDown).to.have.been.called.once;
    });

    it('should call `onMouseUp` callback after button was unpressed', () => {
        let onMouseUp = chai.spy();
        let button = render(<Button onMouseUp={ onMouseUp } />);

        simulate(button.node, 'mouseUp');

        expect(onMouseUp).to.have.been.called.once;
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let button = render(<Button />);

        let node = button.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(button.node);
    });
});
