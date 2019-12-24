/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import cn from 'cn-decorator';

import { createTheme } from 'bem-react-classname';

export const { ThemeProvider, withTheme } = createTheme('alfa-on-white');

export default cn.create(['alfa-on-white', 'alfa-on-color']);
