/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBank9908 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-9908'
            />
        );
    }
}

class ThemedIconBank9908 extends IconBank9908 {}
(ThemedIconBank9908 as any) = withTheme(IconBank9908);
export default ThemedIconBank9908;
