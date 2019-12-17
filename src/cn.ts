/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import cn from 'cn-decorator';
import { createTheme } from 'bem-react-classname';

export default (cn as any).create(['alfa-on-white', 'alfa-on-color']) as (blockName: string) => ClassDecorator;


interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

type CnModifierMap = { [key: string]: boolean | string };

export interface CnFn {
    (map?: CnModifierMap): string;
    (elem: string, map?: CnModifierMap): string;
}

export const { ThemeProvider, withTheme } = createTheme('alfa-on-white');
