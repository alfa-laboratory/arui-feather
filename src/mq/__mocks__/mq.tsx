/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';

import { MqProps } from '../mq';

type MqMockProps = {
    onMatchChange: MqProps['onMatchChange'];
}

let isMatched = true;

class Mq extends React.Component<MqMockProps> {
    componentDidMount() {
        this.props.onMatchChange(isMatched);
    }

    render() {
        return isMatched ? this.props.children : false;
    }
}

export function setIsMatched(newIsMatched: boolean) {
    isMatched = newIsMatched;
}

export default Mq;
