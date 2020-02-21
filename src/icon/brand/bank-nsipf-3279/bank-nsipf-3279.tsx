/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBankNsipf3279 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-nsipf-3279'
            />
        );
    }
}

class ThemedIconBankNsipf3279 extends IconBankNsipf3279 {}
(ThemedIconBankNsipf3279 as any) = withTheme(IconBankNsipf3279);
export default ThemedIconBankNsipf3279;
