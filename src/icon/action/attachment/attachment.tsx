/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../..';
import { IconProps } from '../../icon';

class IconAttachment extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name="attachment"
            />
        );
    }
}

class ThemedIconAttachment extends IconAttachment {}
(ThemedIconAttachment as any) = withTheme(IconAttachment);
export default ThemedIconAttachment;
