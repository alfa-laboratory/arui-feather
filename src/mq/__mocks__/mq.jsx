/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable react/prop-types */
import React from 'react';

let isMatched = true;

class Mq extends React.Component {
    componentDidMount() {
        this.props.onMatchChange(isMatched);
    }

    render() {
        return isMatched ? this.props.children : false;
    }
}

export function setIsMatched(newIsMatched) {
    isMatched = newIsMatched;
}

export default Mq;
