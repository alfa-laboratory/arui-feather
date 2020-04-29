/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../..';
import { IconProps } from '../../icon';

class IconFormat1c extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="format-1c"
            />
        );
    }
}

class ThemedIconFormat1c extends IconFormat1c {}
(ThemedIconFormat1c as any) = withTheme(IconFormat1c);
export default ThemedIconFormat1c;
