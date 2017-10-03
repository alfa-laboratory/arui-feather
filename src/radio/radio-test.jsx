/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate, eventPersist } from '../test-utils';

import Radio from './radio';
import { SCROLL_TO_CORRECTION } from '../vars';

function renderRadio(jsx) {
    return render(jsx);
}

describe('radio', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let radio = renderRadio(<Radio />);

        expect(radio.node).to.exist;
        expect(radio.node).to.have.class('radio');
    });

    it('should radio input render without problems', () => {
        let radio = renderRadio(<Radio text='some label' />);
        let radioInputNode = radio.node.querySelector('input');

        expect(radioInputNode).to.exist;
    });

    it('should radio render with type `button`', () => {
        let radio = renderRadio(<Radio text='button label' type='button' />);
        let buttonNode;

        try {
            buttonNode = radio.node.querySelector('button');
        } catch (error) {
            buttonNode = null;
        }

        expect(buttonNode).to.exist;
        expect(buttonNode).to.have.text('button label');
    });

    it('should radio render with type `normal`', () => {
        let radio = renderRadio(<Radio text='some label' type='normal' />);
        let labelNode = radio.node.querySelector('.radio__text');
        let buttonNode = radio.node.querySelector('button');

        expect(buttonNode).to.not.exist;
        expect(labelNode).to.have.text('some label');
    });

    it('should radio render without any type', () => {
        let radio = renderRadio(<Radio text='some label' />);
        let labelNode = radio.node.querySelector('.radio__text');
        let buttonNode = radio.node.querySelector('button');

        expect(buttonNode).to.not.exist;
        expect(labelNode).to.have.text('some label');
    });

    it('should set class on radio focus', (done) => {
        let radio = renderRadio(<Radio text='some label' />);

        radio.instance.focus();

        setTimeout(() => {
            expect(radio.node).to.have.class('radio_focused');
            done();
        }, 0);
    });

    it('should unset class on radio blur', (done) => {
        let radio = renderRadio(<Radio text='some label' />);

        radio.instance.focus();

        setTimeout(() => {
            expect(radio.node).to.have.class('radio_focused');

            radio.instance.blur();

            setTimeout(() => {
                expect(radio.node).to.have.not.class('radio_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should set class on public focus method', (done) => {
        let radio = renderRadio(<Radio text='some label' />);

        radio.instance.focus();

        setTimeout(() => {
            expect(radio.node).to.have.class('radio_focused');
            done();
        }, 0);
    });

    it('should unset class on public blur method', (done) => {
        let radio = renderRadio(<Radio text='some label' />);

        radio.instance.focus();

        setTimeout(() => {
            expect(radio.node).to.have.class('radio_focused');

            radio.instance.blur();

            setTimeout(() => {
                expect(radio.node).to.not.have.class('radio_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after radio was focused', (done) => {
        let onFocus = sinon.spy();
        let radio = renderRadio(<Radio onFocus={ onFocus } />);

        radio.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after radio was blured', (done) => {
        let onBlur = sinon.spy();
        let radio = renderRadio(<Radio onBlur={ onBlur } />);

        radio.instance.focus();

        setTimeout(() => {
            radio.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after radio was focused with value', (done) => {
        let onFocus = sinon.spy(eventPersist);
        let radio = renderRadio(<Radio value='test' onFocus={ onFocus } />);
        radio.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledWith(sinon.match({ target: { value: 'test' } }));
            done();
        }, 0);
    });

    it('should call `onBlur` callback after radio was blured with value', (done) => {
        let onBlur = sinon.spy(eventPersist);
        let radio = renderRadio(<Radio value='test' onBlur={ onBlur } />);

        radio.instance.focus();

        setTimeout(() => {
            radio.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledWith(sinon.match({ target: { value: 'test' } }));
                done();
            }, 0);
        }, 0);
    });

    it('should set class on radio mouse enter', () => {
        let radio = renderRadio(<Radio text='some label' />);

        simulate(radio.node, 'mouseEnter');

        expect(radio.node).to.have.class('radio_hovered');
    });

    it('should unset class on radio mouse leave', () => {
        let radio = renderRadio(<Radio text='some label' />);

        simulate(radio.node, 'mouseEnter');

        expect(radio.node).to.have.class('radio_hovered');

        simulate(radio.node, 'mouseLeave');

        expect(radio.node).to.have.not.class('radio_hovered');
    });

    it('should call `onMouseEnter` callback after radio was hovered', () => {
        let onMouseEnter = sinon.spy();
        let radio = renderRadio(<Radio onMouseEnter={ onMouseEnter } />);

        simulate(radio.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onMouseLeave` callback after radio was leaved by cursor', () => {
        let onMouseLeave = sinon.spy();
        let radio = renderRadio(<Radio onMouseLeave={ onMouseLeave } />);

        simulate(radio.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.calledOnce;
    });

    it('should set class on radio change', () => {
        let radio = renderRadio(<Radio />);
        let radioInputNode = radio.node.querySelector('input');

        simulate(radioInputNode, 'change');

        expect(radio.node).to.have.class('radio_checked');
    });

    it('should call `onChange` callback after radio was changed', () => {
        let onChange = sinon.spy();
        let radio = renderRadio(<Radio onChange={ onChange } />);
        let radioInputNode = radio.node.querySelector('input');

        simulate(radioInputNode, 'change');

        expect(onChange).to.have.been.calledOnce;
    });

    it('should call `onChange` callback after radio was changed with value and checked state', () => {
        let onChange = sinon.spy();
        let radio = renderRadio(<Radio checked={ false } value='test' onChange={ onChange } />);
        let radioInputNode = radio.node.querySelector('input');

        simulate(radioInputNode, 'change');

        expect(onChange).to.have.been.calledWith('test', true);
    });

    it('should set class on radio button change', () => {
        let radio = renderRadio(<Radio type='button' />);
        let buttonNode = radio.node.querySelector('button');

        buttonNode.click();

        expect(radio.node).to.have.class('radio_checked');
        expect(buttonNode).to.have.class('tag-button_checked');
    });

    it('should call `onChange` callback after radio button was clicked', () => {
        let onChange = sinon.spy();
        let radio = renderRadio(<Radio type='button' onChange={ onChange } />);
        let buttonNode = radio.node.querySelector('button');

        buttonNode.click();

        expect(onChange).to.have.been.calledOnce;
    });

    it('should work with props.checked', () => {
        let radio = renderRadio(<Radio checked={ true } />);

        expect(radio.node).to.have.class('radio_checked');
    });

    it('should not checked with disabled props', () => {
        let radio = renderRadio(<Radio type='button' disabled={ true } />);
        let buttonNode = radio.node.querySelector('button');

        buttonNode.click();

        expect(radio.node).to.have.not.class('radio_checked');
        expect(buttonNode).to.have.not.class('button_checked');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let radio = renderRadio(<Radio text='some label' />);
        let elemTopPosition = radio.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        radio.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);
            done();
        }, 0);
    });
});
