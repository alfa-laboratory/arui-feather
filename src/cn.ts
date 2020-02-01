/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { createTheme } from 'bem-react-classname';
import cn from 'cn-decorator';

type CnModifierMap = { [key: string]: boolean | string };

export interface CnFn {
    (map?: CnModifierMap): string;
    (elem: string, map?: CnModifierMap): string;
}

interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

/**
 * @deprecated
 */
const cnDecorator: (blockName: string) => ClassDecorator = (cn as any).create(['alfa-on-white', 'alfa-on-color']);

/**
 * @deprecated
 */
export default cnDecorator;

export type ThemeType = 'alfa-on-color' | 'alfa-on-white';

export const { withTheme, ThemeProvider } = createTheme<ThemeType>('alfa-on-white');
