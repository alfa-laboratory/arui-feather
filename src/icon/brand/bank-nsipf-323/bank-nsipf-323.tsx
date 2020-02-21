/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { withTheme } from '../../../cn';
import Icon from '../../../icon';
import { IconProps } from '../../../icon/icon';

class IconBankNsipf323 extends React.PureComponent<IconProps> {
    render() {
        return (
            <Icon
                { ...this.props }
                name='bank-nsipf-323'
            />
        );
    }
}

class ThemedIconBankNsipf323 extends IconBankNsipf323 {}
(ThemedIconBankNsipf323 as any) = withTheme(IconBankNsipf323);
export default ThemedIconBankNsipf323;
