/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import IntlPhoneInput from './';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('intl-phone-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('renders without problems', () => {
        let intlPhoneInput = render(<IntlPhoneInput />);
        expect(intlPhoneInput.node).to.have.exist;
    });

    it('should call `onFocus` callback on public `focus` method call', (done) => {
        let onFocus = sinon.spy();
        let elem = render(<IntlPhoneInput onFocus={ onFocus } />);

        elem.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onBlur` on public `blur` method call', (done) => {
        let onBlur = sinon.spy();
        let elem = render(<IntlPhoneInput onBlur={ onBlur } />);

        elem.instance.focus();

        setTimeout(() => {
            elem.instance.blur();
            expect(onBlur).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should scroll window to element on public `scrollTo` method', (done) => {
        let elem = render(<IntlPhoneInput />);
        let elemTopPosition = elem.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        elem.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should show certain country in popup list on matching input change', () => {
        // TODO @teryaew
    });

    it('should call `onChange` callback after component input was changed', () => {
        let onChange = sinon.spy();
        let elem = render(<IntlPhoneInput onChange={ onChange } />);
        let controlNode = elem.node.querySelector('.input__control');

        simulate(controlNode, 'change', { target: { value: '+61' } });

        expect(onChange).to.have.been.calledOnce;
    });

    it('should call `onChange` callback after component select was changed', () => {
        let onChange = sinon.spy();

        render(<IntlPhoneInput onChange={ onChange } />);

        let popupNode = document.querySelector('.popup');
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        expect(onChange).to.have.been.calledOnce;
    });

    it('should have default country flag icon', () => {
        let elem = render(<IntlPhoneInput />);

        expect(elem.node.querySelector('.flag-icon')).to.have.class('flag-icon_country_ru');
    });

    it('should set new country flag icon from props', () => {
        let elem = render(<IntlPhoneInput value='+61' />);

        expect(elem.node.querySelector('.flag-icon')).to.have.class('flag-icon_country_au');
    });
});
