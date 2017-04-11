/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import { SCROLL_TO_CORRECTION } from '../vars';

import MoneyInput from './money-input';

describe('money-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let moneyInput = render(<MoneyInput />);

        expect(moneyInput.node).to.exist;
        expect(moneyInput.node).to.have.class('money-input');
    });

    it('should set focused class on `focus()` call', (done) => {
        let moneyInput = render(<MoneyInput />);

        moneyInput.instance.focus();

        setTimeout(() => {
            expect(moneyInput.node).to.have.class('input_focused');
            done();
        }, 0);
    });

    it('should unset focused class on `blur()` call', (done) => {
        let moneyInput = render(<MoneyInput />);

        moneyInput.instance.focus();

        setTimeout(() => {
            moneyInput.instance.blur();

            expect(moneyInput.node).to.have.not.class('input_focused');
            done();
        }, 0);
    });

    it('should format input value passed with props', () => {
        let moneyInput = render(<MoneyInput value='1234,567' />);
        let controlNode = moneyInput.node.querySelector('input');

        expect(controlNode.value).to.equal('1 234,56');
    });

    it('should format fraction part of input value when fractionLength is 4', () => {
        let moneyInput = render(<MoneyInput value='1234,56789' fractionLength={ 4 } />);
        let controlNode = moneyInput.node.querySelector('input');

        expect(controlNode.value).to.equal('1 234,5678');
    });

    it('should call `onChange` callback after input was changed', () => {
        let onChange = chai.spy();
        let moneyInput = render(<MoneyInput onChange={ onChange } />);
        let controlNode = moneyInput.node.querySelector('input');

        simulate(controlNode, 'change');

        expect(onChange).to.have.been.called.once;
    });

    it('should call `onChange` with 2 params after input was changed', () => {
        let onChange = chai.spy();
        let moneyInput = render(<MoneyInput onChange={ onChange } />);
        let controlNode = moneyInput.node.querySelector('input');

        simulate(controlNode, 'change', { target: { value: '1 234 567,89' } });

        expect(onChange).to.have.been.called.with('1 234 567,89', 1234567.89);
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let moneyInput = render(<MoneyInput />);
        let elemTopPosition = moneyInput.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        moneyInput.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should format new value received in props', () => {
        let moneyInput = render(<MoneyInput value={ '' } />);
        let controlNode = moneyInput.node.querySelector('input');

        render(<MoneyInput value={ '1234,567' } />);

        expect(controlNode.value).to.equal('1 234,56');
    });
});
