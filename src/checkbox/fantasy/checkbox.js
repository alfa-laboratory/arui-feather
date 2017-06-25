/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Checkbox from '../checkbox';
import TagButton from '../../tag-button/fantasy/tag-button';

import cn from '../../cn';

/**
 * Компонент чекбокса в обновлённом дизайне.
 *
 * @extends Radio
 */
@cn('checkbox', TagButton)
class FantasyCheckbox extends Checkbox {}

export default FantasyCheckbox;
