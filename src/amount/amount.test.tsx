/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Amount } from './amount';
import { CURRENCY_MAP } from '../lib/currency-codes';

describe('amount', () => {
    it('should render without problems', () => {
        const amount = mount<Amount>(
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

        expect(amount).toMatchSnapshot();
        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`1 233 141,45 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when amount is negative', () => {
        const amount = mount<Amount>(
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

        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`−4 525,99 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when amount value without minor number', () => {
        const amount = mount<Amount>(
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

        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`17 890,00 ${CURRENCY_MAP.RUR}`);
    });

    it('should render without zero minor part when prop showZeroMinorPart=false ', () => {
        const amount = mount<Amount>(
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

        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`17 890 ${CURRENCY_MAP.RUR}`);
    });

    it('should render when minority equals 1', () => {
        const amount = mount<Amount>(
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

        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`999 ${CURRENCY_MAP.BYR}`);
    });

    it('should render when minority equals 0', () => {
        const amount = mount<Amount>(
            <Amount
                amount={ {
                    value: 999,
                    currency: {
                        code: 'ZWD',
                        minority: 0
                    }
                } }
            />
        );

        // eslint-disable-next-line no-irregular-whitespace
        expect(amount.text()).toContain(`999 ${CURRENCY_MAP.ZWD}`);
    });
});
