/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconArrowLeftDouble extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='arrow-left-double'
            />
        );
    }
}

class ThemedIconArrowLeftDouble extends IconArrowLeftDouble {}
(ThemedIconArrowLeftDouble as any) = withTheme(IconArrowLeftDouble);
export default ThemedIconArrowLeftDouble;
