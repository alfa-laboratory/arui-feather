/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import path from 'path';
import { getComponentScreenshot, matchScreenshot, testCSSPath } from '../../__tests__/tools';

import Amount from './amount';
import { CURRENCY_MAP } from '../lib/currency-codes';

const CSSPaths = ['./attach.css', './attach_theme_alfa-on-color.css', './attach_theme_alfa-on-white.css'].map(item =>
    path.resolve(__dirname, item)
);
const ScreenshotOptions = {};

describe('amount', () => {
    it('should render without problems', () => {
        let amount = mount(
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

    test('should match screenshot', async () => {
        const screenshot = await getComponentScreenshot(
            <Amount>Amount-example</Amount>,
            [...CSSPaths, testCSSPath],
            ScreenshotOptions
        );
        matchScreenshot(screenshot);
    });

    it('should render when amount is negative', () => {
        let amount = mount(
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
        let amount = mount(
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
        let amount = mount(
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
        let amount = mount(
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
});
