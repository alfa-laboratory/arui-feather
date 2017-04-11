/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Amount from './amount';
import { CURRENCY_MAP } from '../lib/currency-codes';

describe('amount', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let amount = render(
            <Amount
                amount={ {
                    value: 123314145,
                    currency: {
                        code: 'RUR',
                        minority: 100
                    }
                } }
            />
        );

        expect(amount.node).to.exist;
        expect(amount.node).to.have.class('amount');
        expect(amount.node).to.have.text(`1 233 141,45 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when amount is negative', () => {
        let amount = render(
            <Amount
                amount={ {
                    value: -452599,
                    currency: {
                        code: 'RUR',
                        minority: 100
                    }
                } }
            />
        );

        expect(amount.node).to.have.text(`−4 525,99 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when amount value without minor number', () => {
        let amount = render(
            <Amount
                amount={ {
                    value: 1789000,
                    currency: {
                        code: 'RUR',
                        minority: 100
                    }
                } }
            />
        );

        expect(amount.node).to.have.text(`17 890,00 ${CURRENCY_MAP.RUR}`);
    });

    it('should render without zero minor part when prop showZeroMinorPart=false ', () => {
        let amount = render(
            <Amount
                amount={ {
                    value: 1789000,
                    currency: {
                        code: 'RUR',
                        minority: 100
                    }
                } }
                showZeroMinorPart={ false }
            />
        );

        expect(amount.node).to.have.text(`17 890 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when minority equals 1', () => {
        let amount = render(
            <Amount
                amount={ {
                    value: 999,
                    currency: {
                        code: 'BYR',
                        minority: 1
                    }
                } }
            />
        );

        expect(amount.node).to.have.text(`999 ${CURRENCY_MAP.BYR}`);
    });
});
