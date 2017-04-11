/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import EmailInput from './email-input';
import { SCROLL_TO_CORRECTION } from '../vars';

function renderEmailInput(jsx) {
    return render(
        jsx,
        {
            css: 'min-width: 9999px; min-height: 9999px; padding: 50px 0 0;'
        }
    );
}

describe('email-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let emailInput = renderEmailInput(<EmailInput />);

        expect(emailInput.node).to.exist;
        expect(emailInput.node).to.have.class('email-input');
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let emailInput = renderEmailInput(<EmailInput />);
        let elemTopPosition = emailInput.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        emailInput.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should set/unset class on public focus/blur methods', () => {
        let emailInput = renderEmailInput(<EmailInput />);

        emailInput.instance.focus();
        expect(emailInput.node).to.have.class('input_focused');

        emailInput.instance.blur();
        expect(emailInput.node).to.not.have.class('input_focused');
    });
});
