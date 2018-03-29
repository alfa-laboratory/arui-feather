/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Menu from './menu';
import { runBenchmark } from '../benchmark-utils';

const MENU_ITEM1 = {
    type: 'item',
    content: 'MenuItem 1',
    value: 'value1',
    props: {
        url: '#1'
    }
};

const MENU_ITEM2 = {
    type: 'item',
    content: 'MenuItem 2',
    value: 'value2',
    props: {
        url: '#2'
    }
};

runBenchmark(Menu, {
    content: [MENU_ITEM1, MENU_ITEM2]
});
