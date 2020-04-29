/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../..';
import { IconProps } from '../../icon';

class IconBank3001 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="bank-3001"
            />
        );
    }
}

class ThemedIconBank3001 extends IconBank3001 {}
(ThemedIconBank3001 as any) = withTheme(IconBank3001);
export default ThemedIconBank3001;
