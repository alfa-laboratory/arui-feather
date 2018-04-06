/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Amount from './amount';
import { runBenchmark } from '../benchmark-utils';

runBenchmark(Amount, {
    amount: {
        value: 123314145,
        currency: {
            code: 'RUR',
            minority: 100
        }
    }
});
