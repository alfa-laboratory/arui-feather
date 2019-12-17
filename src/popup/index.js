/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import '../resize-sensor';

import './popup.css';
import './popup_theme_alfa-on-white.css';
import './popup_theme_alfa-on-color.css';

import { withTheme } from '../cn';
import Component from './popup';

export default withTheme(Component);
