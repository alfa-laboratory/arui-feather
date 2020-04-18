/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { formatAmountToString, THINSP } from './format-amount';

describe('format-amount-to-string', () => {
    it('should return formatted RUR amount in string', () => {
        const amount = {
            value: 1234567,
            currency: {
                code: 'RUR',
                minority: 1,
            },
        };
        const result = formatAmountToString(amount);

        expect(result).toBe(`1${THINSP}234${THINSP}567${THINSP}\u20bd`);
    });
});
