/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createCn } from 'bem-react-classname';
import Link from '../link/link';

/**
 * Компонент таба. Как правило, используется совместно с `Tabs`.
 * @extends Link
 */
class TabItem extends Link {
    static defaultProps = {
        size: 'l',
        disabled: false,
        checked: false,
        pseudo: false,
        tabIndex: 0
    };
    constructor(props) {
        super(props);
        this.cn = createCn('tab-item');
    }
}

export default TabItem;
