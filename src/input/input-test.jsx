/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';

import { render, cleanUp, simulate, eventPersist } from '../test-utils';

import Input from './input';
import MaskedInput from '../masked-input';
import Icon from '../icon/icon';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('input', () => {
    let originalWindowScrollTo = window.scrollTo;
    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should unset class on input blur', () => {
        let input = render(<Input />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'focus');
        expect(input.node).to.have.class('input_focused');

        simulate(controlNode, 'blur');
        expect(input.node).to.not.have.class('input_focused');
    });

    it('should render with disabled class', () => {
        let input = render(<Input disabled={ true } />);

        expect(input.node).to.have.class('input_disabled');
    });

    it('should unset class on public blur method', (done) => {
        let input = render(<Input />);

        input.instance.focus();

        setTimeout(() => {
            expect(input.node).to.have.class('input_focused');

            input.instance.blur();

            setTimeout(() => {
                expect(input.node).to.not.have.class('input_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should set class on public focus method', (done) => {
        let input = render(<Input />);

        input.instance.focus();

        setTimeout(() => {
            expect(input.node).to.have.class('input_focused');
            done();
        }, 0);
    });

    it('should scroll window to element on public `scrollTo` method', (done) => {
        let input = render(<Input />);
        let elemTopPosition = input.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        input.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should set selection to all value when `setSelectionRange` method was called without parameters', (done) => {
        let input = render(<Input value='test' />);

        input.instance.focus();

        setTimeout(() => {
            input.instance.setSelectionRange();
            expect(window.getSelection().toString()).to.be.eq('test');
            done();
        }, 500);
    });

    it('should set selection when setSelection range was called with parameters', (done) => {
        let input = render(<Input value='test' />);

        input.instance.focus();

        setTimeout(() => {
            input.instance.setSelectionRange(0, 2);
            expect(window.getSelection().toString()).to.be.eq('te');

            input.instance.setSelectionRange(2, 4);
            expect(window.getSelection().toString()).to.be.eq('st');
            done();
        }, 200);
    });

    it('should render without problems', function () {
        let input = render(<Input />);

        expect(input.node).to.exist;
        expect(input.node).to.have.class('input');
    });

    it('should set focus class on input focus', (done) => {
        let input = render(<Input />);

        input.instance.focus();

        setTimeout(() => {
            expect(input.node).to.have.class('input_focused');
            done();
        }, 0);
    });

    it('should set focused className from props', () => {
        let input = render(<Input focused={ true } />);

        expect(input.node).to.have.class('input_focused');
    });

    it('should render with `label` from props', () => {
        let input = render(<Input label='Label' />);
        let topNode = input.node.querySelector('.input__top');

        expect(topNode).to.exist;
        expect(topNode).to.have.text('Label');
    });

    it('should render with `placeholder` from props', () => {
        let input = render(<Input placeholder='Placeholder' />);
        let controlNode = input.node.querySelector('input');

        expect(controlNode).to.have.attr('placeholder', 'Placeholder');
    });

    it('should render with `hint` from props', () => {
        let input = render(<Input hint='Hint' />);
        let subNode = input.node.querySelector('.input__sub');

        expect(subNode).to.exist;
        expect(subNode).to.have.text('Hint');
    });

    it('should render with `error` from props', () => {
        let input = render(<Input error='Error' />);
        let subNode = input.node.querySelector('.input__sub');

        expect(subNode).to.exist;
        expect(subNode).to.have.text('Error');
    });

    it('should render with `off` autocomplete attribute', () => {
        let input = render(<Input autocomplete={ false } />);
        let controlNode = input.node.querySelector('input');

        expect(controlNode).to.have.attr('autocomplete', 'off');
    });

    it('should render with `on` autocomplete attribute', () => {
        let input = render(<Input autocomplete={ true } />);
        let controlNode = input.node.querySelector('input');

        expect(controlNode).to.have.attr('autocomplete', 'on');
    });

    it('should set value from props', () => {
        let input = render(<Input value='text' />);
        let controlNode = input.node.querySelector('input');

        expect(controlNode).to.have.value('text');
    });

    it('should change the state value when props is not defined', () => {
        let input = render(<Input />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'change', { target: { value: 'other value' } });

        expect(controlNode).to.have.value('other value');
    });

    it('should call `onFocus` callback after input was focused', (done) => {
        let onFocus = sinon.spy();
        let input = render(<Input onFocus={ onFocus } />);

        input.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onClick` callback after input was clicked', () => {
        let onClick = sinon.spy();
        let input = render(<Input onClick={ onClick } />);
        let controlNode = input.node.querySelector('input');

        controlNode.click();

        expect(onClick).to.have.been.calledOnce;
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        let onKeyDown = sinon.spy();
        let input = render(<Input onKeyDown={ onKeyDown } />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'keyDown');

        expect(onKeyDown).to.have.been.calledOnce;
    });

    it('should call `onBlur` callback after input was blured', (done) => {
        let onBlur = sinon.spy();
        let input = render(<Input onBlur={ onBlur } />);
        input.instance.focus();

        setTimeout(() => {
            input.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                done();
            }, 0);
        }, 0);
    });

    it('should receive SyntheticEvent with type focus in first argument of `onFocus` callback', (done) => {
        let onFocus = sinon.spy(eventPersist);
        let input = render(<Input onFocus={ onFocus } />);

        input.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            expect(onFocus).to.have.been.calledWith(sinon.match({ type: 'focus' }));
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type blur in first argument of `onBlur` callback', (done) => {
        let onBlur = sinon.spy(eventPersist);
        let input = render(<Input onBlur={ onBlur } />);

        input.instance.focus();

        setTimeout(() => {
            input.instance.blur();

            expect(onBlur).to.have.been.calledOnce;
            expect(onBlur).to.have.been.calledWith(sinon.match({ type: 'blur' }));
            done();
        }, 0);
    });

    it('should call `onChange` callback', () => {
        let onChange = sinon.spy();
        let input = render(<Input onChange={ onChange } />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'change', { target: { value: 'other value' } });

        expect(onChange).to.have.been.calledOnce;
    });

    it('should render with clear element', () => {
        let input = render(<Input clear={ true } value='text' />);
        let clearNode = input.node.querySelector('.input__clear');

        expect(clearNode).to.exist;
    });

    it('should call `onClearClick` callback on clear icon click', () => {
        let onClearClick = sinon.spy();
        let input = render(<Input clear={ true } onClearClick={ onClearClick } />);
        let controlNode = input.node.querySelector('input');
        simulate(controlNode, 'change', { target: { value: 'value' } });
        let clearNode = input.node.querySelector('.input__clear');

        clearNode.click();

        expect(onClearClick).to.have.been.calledOnce;
    });

    it('should clear value after clear icon click', () => {
        let input = render(<Input clear={ true } />);
        let controlNode = input.node.querySelector('input');
        simulate(controlNode, 'change', { target: { value: 'value' } });
        let clearNode = input.node.querySelector('.input__clear');

        clearNode.click();

        expect(controlNode).to.have.value('');
    });

    it('should call `onChange` listener after clear icon click', () => {
        let onChange = sinon.spy();
        let input = render(
            <Input
                value='text'
                clear={ true }
                onChange={ onChange }
            />
        );
        let clearNode = input.node.querySelector('.input__clear');

        clearNode.click();

        expect(onChange).to.have.been.calledOnce;
    });

    it('should render with icon', function () {
        let input = render(<Input icon={ <Icon name='search' /> } />);
        let iconNode = input.node.querySelector('.input__icon');

        expect(iconNode).to.exist;
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let input = render(<Input />);

        let node = input.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(input.node);
    });

    it('should format masked value with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) { return /^[ЁёА-Яа-я]$/.test(char); }
            }
        };
        let input = render(
            <Input maskFormatCharacters={ cyrillic } mask='c 111 cc' value='12-3hjhkА456ИТг' />
        );
        let controlNode = input.node.querySelector('input');

        expect(controlNode.value).to.equal('А 456 ИТ');
    });

    it('should return `HTMLInputElement` when `getControl` method called', () => {
        let input = render(<Input />);
        let controlNode = input.instance.getControl();

        expect(controlNode).to.be.instanceOf(HTMLInputElement);
    });

    it('should return `HTMLInputElement` when `getControl` method called and mask is set', () => {
        let input = render(<Input mask='111' />);
        let controlNode = input.instance.getControl();

        expect(controlNode).to.be.instanceOf(HTMLInputElement);
    });

    it('should return null when `getMaskedInputInstance` method is called and mask is not set', () => {
        let input = render(<Input />);
        let maskedInputInstance = input.instance.getMaskedInputInstance();

        expect(maskedInputInstance).to.be.null;
    });

    it('should return MaskedInput instance when getMaskedInputInstance method is called and mask is set', () => {
        let input = render(<Input mask='111' />);
        let maskedInputInstance = input.instance.getMaskedInputInstance();

        expect(maskedInputInstance).to.be.instanceOf(MaskedInput);
    });

    if (bowser.mobile) {
        it('should call `onTouchStart` callback after input was touched', () => {
            let onTouchStart = sinon.spy();
            let input = render(<Input onTouchStart={ onTouchStart } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchStart');

            expect(onTouchStart).to.have.been.calledOnce;
        });

        it('should call `onTouchEnd` callback after input was released on touch', () => {
            let onTouchEnd = sinon.spy();
            let input = render(<Input onTouchEnd={ onTouchEnd } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchEnd');

            expect(onTouchEnd).to.have.been.calledOnce;
        });

        it('should call `onTouchCancel` callback after input was disrupted on touch', () => {
            let onTouchCancel = sinon.spy();
            let input = render(<Input onTouchCancel={ onTouchCancel } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchCancel');

            expect(onTouchCancel).to.have.been.calledOnce;
        });

        it('should call `onTouchMove` callback after input was touched and moved', () => {
            let onTouchMove = sinon.spy();
            let input = render(<Input onTouchMove={ onTouchMove } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchMove');

            expect(onTouchMove).to.have.been.calledOnce;
        });

        it('should call `onTouchStart` callback with argument as SyntheticEvent and type \'touchstart\'', () => {
            let onTouchStart = sinon.spy();
            let input = render(<Input onTouchStart={ onTouchStart } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchStart');

            expect(onTouchStart).to.have.been.calledOnce;
            expect(onTouchStart).to.have.been.calledWith(sinon.match({ type: 'touchstart' }));
        });

        it('should call `onTouchEnd` callback with argument as SyntheticEvent and type \'touchend\'', () => {
            let onTouchEnd = sinon.spy();
            let input = render(<Input onTouchEnd={ onTouchEnd } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchEnd');
            expect(onTouchEnd).to.have.been.calledOnce;
            expect(onTouchEnd).to.have.been.calledWith(sinon.match({ type: 'touchend' }));
        });

        it('should call `onTouchMove` callback with argument as SyntheticEvent and type \'touchmove\'', () => {
            let onTouchMove = sinon.spy();
            let input = render(<Input onTouchMove={ onTouchMove } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchMove');
            expect(onTouchMove).to.have.been.calledOnce;
            expect(onTouchMove).to.have.been.calledWith(sinon.match({ type: 'touchmove' }));
        });

        it('should call `onTouchCancel` callback with argument as SyntheticEvent and type \'touchcancel\'', () => {
            let onTouchCancel = sinon.spy();
            let input = render(<Input onTouchCancel={ onTouchCancel } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchCancel');
            expect(onTouchCancel).to.have.been.calledOnce;
            expect(onTouchCancel).to.have.been.calledWith(sinon.match({ type: 'touchcancel' }));
        });
    }
});
