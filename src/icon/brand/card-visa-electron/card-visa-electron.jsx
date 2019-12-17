/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Icon from '../../../icon';

class IconCardVisaElectron extends React.Component {
    static propTypes = Icon.propTypes;

    render() {
        return (
            <Icon
                { ...this.props }
                name='card-visa-electron'
            />
        );
    }
}

export default withTheme(IconCardVisaElectron);
