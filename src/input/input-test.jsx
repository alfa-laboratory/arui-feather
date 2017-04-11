/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';

import { render, cleanUp, simulate } from '../test-utils';

import Input from './input';
import Icon from '../icon/icon';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
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
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should set selection to all value when `setSelectionRange` method was called without parameters', () => {
        let input = render(<Input value='test' />);

        input.instance.setSelectionRange();

        expect(window.getSelection().toString()).to.be.eq('test');
    });

    it('should set selection when setSelection range was called with parameters', () => {
        let input = render(<Input value='test' />);

        input.instance.setSelectionRange(0, 2);

        expect(window.getSelection().toString()).to.be.eq('te');

        input.instance.setSelectionRange(2, 4);

        expect(window.getSelection().toString()).to.be.eq('st');
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
        let onFocus = chai.spy();
        let input = render(<Input onFocus={ onFocus } />);

        input.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onClick` callback after input was clicked', () => {
        let onClick = chai.spy();
        let input = render(<Input onClick={ onClick } />);
        let controlNode = input.node.querySelector('input');

        controlNode.click();

        expect(onClick).to.have.been.called.once;
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        let onKeyDown = chai.spy();
        let input = render(<Input onKeyDown={ onKeyDown } />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'keyDown');

        expect(onKeyDown).to.have.been.called.once;
    });

    it('should call `onBlur` callback after input was blured', (done) => {
        let onBlur = chai.spy();
        let input = render(<Input onBlur={ onBlur } />);

        input.instance.focus();

        setTimeout(() => {
            input.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should receive SyntheticEvent with type focus in first argument of `onFocus` callback', (done) => {
        let type = '';
        let onFocus = chai.spy((event) => { type = event.type; });
        let input = render(<Input onFocus={ onFocus } />);

        input.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            expect(type).to.equal('focus');
            done();
        }, 0);
    });

    it('should receive SyntheticEvent with type blur in first argument of `onBlur` callback', (done) => {
        let type = '';
        let onBlur = chai.spy((event) => { type = event.type; });
        let input = render(<Input onBlur={ onBlur } />);

        input.instance.focus();

        setTimeout(() => {
            input.instance.blur();

            expect(onBlur).to.have.been.called.once;
            expect(type).to.equal('blur');
            done();
        }, 0);
    });

    it('should call `onChange` callback', () => {
        let onChange = chai.spy();
        let input = render(<Input onChange={ onChange } />);
        let controlNode = input.node.querySelector('input');

        simulate(controlNode, 'change', { target: { value: 'other value' } });

        expect(onChange).to.have.been.called.once;
    });

    it('should render with clear element', () => {
        let input = render(<Input clear={ true } value='text' />);
        let clearNode = input.node.querySelector('.input__clear');

        expect(clearNode).to.exist;
    });

    it('should call `onClearClick` callback on clear icon click', () => {
        let onClearClick = chai.spy();
        let input = render(<Input clear={ true } onClearClick={ onClearClick } />);
        let controlNode = input.node.querySelector('input');
        simulate(controlNode, 'change', { target: { value: 'value' } });
        let clearNode = input.node.querySelector('.input__clear');

        clearNode.click();

        expect(onClearClick).to.have.been.called.once;
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
        let onChange = chai.spy();
        let input = render(
            <Input
                value='text'
                clear={ true }
                onChange={ onChange }
            />
        );
        let clearNode = input.node.querySelector('.input__clear');

        clearNode.click();

        expect(onChange).to.have.been.called.once;
    });

    it('should render with icon', function () {
        let input = render(<Input icon={ <Icon icon='search' /> } />);
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

    if (bowser.mobile) {
        it('should call `onTouchStart` callback after input was touched', () => {
            let onTouchStart = chai.spy();
            let input = render(<Input onTouchStart={ onTouchStart } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchStart');

            expect(onTouchStart).to.have.been.called.once;
        });

        it('should call `onTouchEnd` callback after input was released on touch', () => {
            let onTouchEnd = chai.spy();
            let input = render(<Input onTouchEnd={ onTouchEnd } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchEnd');

            expect(onTouchEnd).to.have.been.called.once;
        });

        it('should call `onTouchCancel` callback after input was disrupted on touch', () => {
            let onTouchCancel = chai.spy();
            let input = render(<Input onTouchCancel={ onTouchCancel } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchCancel');

            expect(onTouchCancel).to.have.been.called.once;
        });

        it('should call `onTouchMove` callback after input was touched and moved', () => {
            let onTouchMove = chai.spy();
            let input = render(<Input onTouchMove={ onTouchMove } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchMove');

            expect(onTouchMove).to.have.been.called.once;
        });

        it('should call `onTouchStart` callback with argument as SyntheticEvent and type \'touchstart\'', (done) => {
            let type = '';
            let onTouchStart = chai.spy((event) => { type = event.type; });
            let input = render(<Input onTouchStart={ onTouchStart } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchStart');

            setTimeout(() => {
                expect(onTouchStart).to.have.been.called.once;
                expect(type).to.equal('touchstart');
                done();
            }, 0);
        });

        it('should call `onTouchEnd` callback with argument as SyntheticEvent and type \'touchend\'', (done) => {
            let type = '';
            let onTouchEnd = chai.spy((event) => { type = event.type; });
            let input = render(<Input onTouchEnd={ onTouchEnd } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchEnd');

            setTimeout(() => {
                expect(onTouchEnd).to.have.been.called.once;
                expect(type).to.equal('touchend');
                done();
            }, 0);
        });

        it('should call `onTouchMove` callback with argument as SyntheticEvent and type \'touchmove\'', (done) => {
            let type = '';
            let onTouchMove = chai.spy((event) => { type = event.type; });
            let input = render(<Input onTouchMove={ onTouchMove } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchMove');

            setTimeout(() => {
                expect(onTouchMove).to.have.been.called.once;
                expect(type).to.equal('touchmove');
                done();
            }, 0);
        });

        it('should call `onTouchCancel` callback with argument as SyntheticEvent and type \'touchcancel\'', (done) => {
            let type = '';
            let onTouchCancel = chai.spy((event) => { type = event.type; });
            let input = render(<Input onTouchCancel={ onTouchCancel } />);
            let controlNode = input.node.querySelector('input');

            simulate(controlNode, 'touchCancel');

            setTimeout(() => {
                expect(onTouchCancel).to.have.been.called.once;
                expect(type).to.equal('touchcancel');
                done();
            }, 0);
        });
    }
});
