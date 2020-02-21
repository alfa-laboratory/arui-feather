/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBank7686 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-7686'
            />
        );
    }
}

class ThemedIconBank7686 extends IconBank7686 {}
(ThemedIconBank7686 as any) = withTheme(IconBank7686);
export default ThemedIconBank7686;
