/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Select from './select';
import { runBenchmark } from '../benchmark-utils';

const OPTIONS = [
    {
        value: 1,
        text: 'Vk',
        checkedText: 'Vkontakte'
    },
    {
        value: 2,
        text: 'Fb',
        checkedText: 'Facebook'
    },
    {
        value: 3,
        text: 'Tw',
        checkedText: 'Twitter'
    }
];

runBenchmark(Select, {
    options: OPTIONS
}, 50);
