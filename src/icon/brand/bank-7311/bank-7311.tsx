/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBank7311 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-7311'
            />
        );
    }
}

class ThemedIconBank7311 extends IconBank7311 {}
(ThemedIconBank7311 as any) = withTheme(IconBank7311);
export default ThemedIconBank7311;
