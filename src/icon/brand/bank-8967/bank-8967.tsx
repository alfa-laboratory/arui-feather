/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBank8967 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-8967'
            />
        );
    }
}

class ThemedIconBank8967 extends IconBank8967 {}
(ThemedIconBank8967 as any) = withTheme(IconBank8967);
export default ThemedIconBank8967;
