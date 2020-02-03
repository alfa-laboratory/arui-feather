/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import { Button } from '../button/button';

/**
 * Компонент кнопки с иконкой.
 *
 * @extends Button
 */
export class IconButton extends Button {
    cn = createCn('icon-button');
}

export default withTheme(IconButton);
