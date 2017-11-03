/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import IntlPhoneInput from './intl-phone-input';

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

    it('should scroll window to element on public `scrollTo` method call', (done) => {
        let elem = render(<IntlPhoneInput />);
        let elemTopPosition = elem.node.getBoundingClientRect().top;

        elem.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemTopPosition);
            done();
        }, 0);
    });

    it('should call `onChange` callback after component `value` prop was changed', () => {
    });

    it('should call `onChange` callback after component select was changed', () => {
    });

    it('should load formatting util', () => {
    });

    it('should have default country flag icon', () => {
        let elem = render(<IntlPhoneInput />);
        expect(elem.node.querySelector('.flag-icon')).to.have.class('flag-icon_country_ru');
    });

    it('should set new country flag icon from props', () => {
    });
});
