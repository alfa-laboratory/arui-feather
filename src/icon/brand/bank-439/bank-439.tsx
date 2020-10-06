/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import Icon from '../..';
import { withTheme } from '../../../cn';
import { IconProps } from '../../icon';

class IconBank439 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="bank-439"
            />
        );
    }
}

export default withTheme<IconProps, IconBank439>(IconBank439);
