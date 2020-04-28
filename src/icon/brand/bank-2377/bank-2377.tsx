/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../..';
import { IconProps } from '../../icon';

class IconBank2377 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="bank-2377"
            />
        );
    }
}

class ThemedIconBank2377 extends IconBank2377 {}
(ThemedIconBank2377 as any) = withTheme(IconBank2377);
export default ThemedIconBank2377;
