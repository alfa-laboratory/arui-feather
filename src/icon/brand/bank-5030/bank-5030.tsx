/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBank5030 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-5030'
            />
        );
    }
}

class ThemedIconBank5030 extends IconBank5030 {}
(ThemedIconBank5030 as any) = withTheme(IconBank5030);
export default ThemedIconBank5030;
