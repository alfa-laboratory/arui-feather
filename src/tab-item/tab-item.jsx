/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Link from '../link/link';
import cn from '../cn';

/**
 * Компонент таба. Как правило, используется совместно с `Tabs`.
 * @extends Link
 */
@cn('tab-item')
export default class TabItem extends Link {
    static defaultProps = {
        size: 'l',
        disabled: false,
        checked: false,
        pseudo: false,
        tabIndex: 0
    };
}
