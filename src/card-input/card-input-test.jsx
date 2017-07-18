/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import CardInput from './card-input';
import { SCROLL_TO_CORRECTION } from '../vars';

describe('card-input', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = sinon.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problems', () => {
        let cardInput = render(<CardInput />);

        expect(cardInput.node).to.exist;
        expect(cardInput.node).to.have.class('card-input');
    });

    it('should scroll window to element on public `scrollTo` method call', (done) => {
        let cardInput = render(<CardInput />);
        let elemTopPosition = cardInput.node.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        cardInput.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.calledWith(0, elemScrollTo);

            done();
        }, 0);
    });

    it('should set/unset class on public focus/blur methods', () => {
        let cardInput = render(<CardInput />);

        cardInput.instance.focus();
        expect(cardInput.node).to.have.class('input_focused');

        cardInput.instance.blur();
        expect(cardInput.node).to.not.have.class('input_focused');
    });

    it('should set `type` attribute to `tel`', () => {
        let cardInput = render(<CardInput />);

        let inputNode = cardInput.node.querySelector('input');
        expect(inputNode.type).to.equal('tel');
    });
});
