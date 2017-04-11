/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import PhoneInput from './phone-input';

import { SCROLL_TO_CORRECTION } from '../vars';

describe('phone-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let phoneInput = render(<PhoneInput />);
        let elemTopPosition = phoneInput.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        phoneInput.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should set/unset class on public focus/blur methods', (done) => {
        let phoneInput = render(<PhoneInput />);

        phoneInput.instance.focus();

        setTimeout(() => {
            expect(phoneInput.node).to.have.class('input_focused');

            phoneInput.instance.blur();

            setTimeout(() => {
                expect(phoneInput.node).to.not.have.class('input_focused');
                done();
            }, 0);
        }, 0);
    });
});
