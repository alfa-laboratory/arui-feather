/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import CardNumber from './card-number';

describe('card-number', () => {
    afterEach(cleanUp);

    it('should render splitted number taken from block content', () => {
        let cardNumber = render(<CardNumber>1234029302029321</CardNumber>);

        expect(cardNumber.node).to.have.text('1234 0293 0202 9321');
    });

    it('should render splitted number taken from attrubite `value`', () => {
        let cardNumber = render(<CardNumber value='1234029302029321' />);

        expect(cardNumber.node).to.have.text('1234 0293 0202 9321');
    });

    it('should render short, not splitted number', () => {
        let cardNumber = render(<CardNumber>12340293</CardNumber>);

        expect(cardNumber.node).to.have.text('12340293');
    });

    it('should render mask number with dots', () => {
        let cardNumber = render(<CardNumber>1234********0293</CardNumber>);
        let cardNumberParts = cardNumber.node.childNodes;
        let dotClassName = 'card-number__dot';

        expect(cardNumberParts[0]).to.have.text('1234');
        expect(cardNumberParts[5]).to.have.text('0293');

        for (let i = 1; i <= 4; i++) {
            expect(cardNumberParts[i]).to.have.class(dotClassName);
        }
    });
});
