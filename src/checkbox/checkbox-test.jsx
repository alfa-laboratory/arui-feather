/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import CheckBox from './checkbox';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('checkbox', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let checkbox = render(<CheckBox />);

        expect(checkbox.node).to.exist;
        expect(checkbox.node).to.have.class('checkbox');
    });

    it('should checkbox render with type `button`', () => {
        let checkbox = render(<CheckBox text='button label' type='button' />);
        let buttonNode = checkbox.node.querySelector('button');

        expect(buttonNode).to.exist;
        expect(buttonNode).to.have.text('button label');
    });

    it('should checkbox render with type `normal`', () => {
        let checkbox = render(<CheckBox text='some label' type='normal' />);
        let buttonNode = checkbox.node.querySelector('button');
        let labelNode = checkbox.node.querySelector('.checkbox__text');

        expect(buttonNode).to.not.exist;
        expect(labelNode).to.have.text('some label');
    });

    it('should checkbox render without any type', () => {
        let checkbox = render(<CheckBox text='some label' />);
        let buttonNode = checkbox.node.querySelector('button');
        let labelNode = checkbox.node.querySelector('.checkbox__text');

        expect(buttonNode).to.not.exist;
        expect(labelNode).to.have.text('some label');
    });

    it('should set class on checkbox focus', (done) => {
        let checkbox = render(<CheckBox text='some label' />);

        checkbox.instance.focus();

        setTimeout(() => {
            expect(checkbox.node).to.have.class('checkbox_focused');
            done();
        }, 0);
    });

    it('should unset class on checkbox blur', (done) => {
        let checkbox = render(<CheckBox text='some label' />);

        checkbox.instance.focus();

        setTimeout(() => {
            checkbox.instance.blur();

            setTimeout(() => {
                expect(checkbox.node).to.not.have.class('checkbox_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after checkbox was focused', (done) => {
        let onFocus = sinon.spy();
        let checkbox = render(<CheckBox onFocus={ onFocus } />);

        checkbox.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after checkbox was blured', (done) => {
        let onBlur = sinon.spy();
        let checkbox = render(<CheckBox onBlur={ onBlur } />);

        checkbox.instance.focus();

        setTimeout(() => {
            checkbox.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                done();
            }, 0);
        }, 0);
    });

    it('should set class on checkbox mouse enter', () => {
        let checkbox = render(<CheckBox text='some label' />);

        simulate(checkbox.node, 'mouseEnter');

        expect(checkbox.node).to.have.class('checkbox_hovered');
    });

    it('should unset class on checkbox mouse leave', () => {
        let checkbox = render(<CheckBox text='some label' />);

        simulate(checkbox.node, 'mouseEnter');
        expect(checkbox.node).to.have.class('checkbox_hovered');

        simulate(checkbox.node, 'mouseLeave');
        expect(checkbox.node).to.not.have.class('checkbox_hovered');
    });

    it('should call `onMouseEnter` callback after checkbox was hovered', () => {
        let onMouseEnter = sinon.spy();
        let checkbox = render(<CheckBox onMouseEnter={ onMouseEnter } />);

        simulate(checkbox.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onMouseLeave` callback after checkbox was leaved by cursor', () => {
        let onMouseLeave = sinon.spy();
        let checkbox = render(<CheckBox onMouseLeave={ onMouseLeave } />);

        simulate(checkbox.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.calledOnce;
    });

    it('should set class on checkbox change', () => {
        let checkbox = render(<CheckBox />);
        let controlNode = checkbox.node.querySelector('input');

        simulate(controlNode, 'change');

        expect(checkbox.node).to.have.class('checkbox_checked');
    });

    it('should call `onChange` callback after checkbox was changed', () => {
        let onChange = sinon.spy();
        let checkbox = render(<CheckBox onChange={ onChange } />);
        let controlNode = checkbox.node.querySelector('input');

        simulate(controlNode, 'change');

        expect(onChange).to.have.been.calledOnce;
    });

    it('should set class on checkbox button change', () => {
        let checkbox = render(<CheckBox type='button' />);
        let buttonNode = checkbox.node.querySelector('button');

        buttonNode.click();

        expect(checkbox.node).to.have.class('checkbox_checked');
        expect(buttonNode).to.have.class('tag-button_checked');
    });

    it('should call `onChange` callback after checkbox button was clicked', () => {
        let onChange = sinon.spy();
        let checkbox = render(<CheckBox type='button' onChange={ onChange } />);
        let buttonNode = checkbox.node.querySelector('button');

        buttonNode.click();

        expect(onChange).to.have.been.calledOnce;
    });

    it('should work with props.checked', () => {
        let checkbox = render(<CheckBox checked={ true } />);

        expect(checkbox.node).to.have.class('checkbox_checked');
    });

    it('should not checked with disabled props', () => {
        let checkbox = render(<CheckBox type='button' disabled={ true } />);
        let buttonNode = checkbox.node.querySelector('button');

        buttonNode.click();

        expect(checkbox.node).to.not.have.class('checkbox_checked');
        expect(buttonNode).to.not.have.class('button_checked');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let checkbox = render(<CheckBox type='button' />);
        let elemTopPosition = checkbox.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        checkbox.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);
            done();
        }, 0);
    });
});
