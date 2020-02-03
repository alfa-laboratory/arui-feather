/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import { LinkProps, Link } from '../link/link';

/**
 * Компонент таба. Как правило, используется совместно с `Tabs`.
 */
export class TabItem extends Link {
    cn = createCn('tab-item');
    static defaultProps: Partial<LinkProps> = {
        size: 'l',
        view: 'default',
        disabled: false,
        checked: false,
        pseudo: false,
        tabIndex: 0
    };
}

export default withTheme(TabItem);
