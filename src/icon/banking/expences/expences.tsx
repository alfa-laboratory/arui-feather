/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../..';
import { IconProps } from '../../icon';

class IconExpences extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="expences"
            />
        );
    }
}

export default withTheme<IconProps, IconExpences>(IconExpences);
