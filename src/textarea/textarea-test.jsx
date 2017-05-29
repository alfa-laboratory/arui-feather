/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Textarea from './textarea';

import { SCROLL_TO_CORRECTION } from '../vars';

function renderTextarea(props = {}) {
    let textarea = render(
        <Textarea { ...props } />,
        {
            css: 'min-width: 9999px; min-height: 9999px; padding: 50px 0 0;'
        }
    );
    textarea.controlNode = textarea.node.querySelector('.textarea__control');
    return textarea;
}

describe('textarea', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should unset class on textarea blur', () => {
        let textarea = renderTextarea();

        simulate(textarea.controlNode, 'focus');
        expect(textarea.node).to.have.class('textarea_focused');

        simulate(textarea.controlNode, 'blur');
        expect(textarea.node).to.not.have.class('textarea_focused');
    });

    it('should render with disabled class', () => {
        let textarea = renderTextarea({ disabled: true });

        expect(textarea.node).to.have.class('textarea_disabled');
    });

    it('should set class on public focus method', (done) => {
        let textarea = renderTextarea();

        textarea.instance.focus();

        setTimeout(() => {
            expect(textarea.node).to.have.class('textarea_focused');
            done();
        }, 0);
    });

    it('should unset class on public blur method', (done) => {
        let textarea = renderTextarea();

        textarea.instance.focus();

        setTimeout(() => {
            expect(textarea.node).to.have.class('textarea_focused');
            textarea.instance.blur();

            setTimeout(() => {
                expect(textarea.node).to.not.have.class('textarea_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should render without problems', () => {
        let textarea = renderTextarea();

        expect(textarea.node).to.exist;
        expect(textarea.node).to.have.class('textarea');
    });

    it('should set class on textarea focus', (done) => {
        let textarea = renderTextarea();

        textarea.instance.focus();

        setTimeout(() => {
            expect(textarea.node).to.have.class('textarea_focused');
            done();
        }, 0);
    });

    it('should call `onFocus` callback after textarea was focused', (done) => {
        let onFocus = chai.spy();
        let textarea = renderTextarea({ onFocus });

        textarea.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after textarea was blured', (done) => {
        let onBlur = chai.spy();
        let textarea = renderTextarea({ onBlur });

        textarea.instance.focus();

        setTimeout(() => {
            textarea.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should receive SyntheticEvent with type blur in first argument of `onBlur` callback', (done) => {
        let eventType;
        let onBlur = chai.spy((...args) => { eventType = args[0].type; });
        let textarea = renderTextarea({ onBlur });

        textarea.instance.focus();

        setTimeout(() => {
            textarea.instance.blur();

            setTimeout(() => {
                expect(eventType).to.equal('blur');
                done();
            }, 0);
        }, 0);
    });

    it('should change the state value when props is not defined', () => {
        let textarea = renderTextarea();

        simulate(textarea.controlNode, 'change', { target: { value: 'other value' } });

        expect(textarea.controlNode.value).to.equal('other value');
    });

    it('should set value from props', () => {
        let textarea = renderTextarea({ value: 'text' });

        expect(textarea.controlNode.value).to.equal('text');
    });

    it('should call onChange callback', () => {
        let onChange = chai.spy();
        let textarea = renderTextarea({ onChange });

        simulate(textarea.controlNode, 'change', { target: { value: 'other value' } });

        expect(onChange).to.have.been.called.once;
    });

    it('should render with `off` autocomplete attribute', () => {
        let textarea = renderTextarea({ autocomplete: false });

        expect(textarea.controlNode).to.have.attr('autocomplete', 'off');
    });

    it('should render with `on` autocomplete attribute', () => {
        let textarea = renderTextarea({ autocomplete: true });

        expect(textarea.controlNode).to.have.attr('autocomplete', 'on');
    });

    it('should render with resize `none` class', () => {
        let textarea = renderTextarea({ resize: 'none' });

        expect(textarea.node).to.have.class('textarea_resize_none');
    });

    it('should render with resize `both` class', () => {
        let textarea = renderTextarea({ resize: 'both' });

        expect(textarea.node).to.have.class('textarea_resize_both');
    });

    it('should render with resize `vertical` class', () => {
        let textarea = renderTextarea({ resize: 'vertical' });

        expect(textarea.node).to.have.class('textarea_resize_vertical');
    });

    it('should render with resize `horizontal` class', () => {
        let textarea = renderTextarea({ resize: 'horizontal' });

        expect(textarea.node).to.have.class('textarea_resize_horizontal');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let textarea = renderTextarea();
        let elemTopPosition = textarea.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        textarea.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);

            done();
        }, 0);
    });

    it('should render with autosize class', () => {
        let textarea = renderTextarea({ autosize: true });

        expect(textarea.node).to.have.class('textarea_autosize');
    });

    it('should call `onHeightChange` callback after add new line with autoresize=true', () => {
        let onHeightChange = chai.spy();
        let textarea = renderTextarea({ autosize: true, value: 'value', onHeightChange });

        simulate(textarea.controlNode, 'change', { target: { value: 'other value\n' } });

        expect(onHeightChange).to.have.been.called.once;
    });
});
