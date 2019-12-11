/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import autobind from 'core-decorators/lib/autobind';
import { getMatchMedia, releaseMatchMedia } from '../lib/match-media';

export default function mqDecorator(query, propName = 'mqMatch') {
    return function (Component) {
        return class extends React.Component {
            mql = null;

            state = {
                matched: false
            };

            componentDidMount() {
                this.mql = getMatchMedia(query);
                this.handleMatchChange(this.mql);
                this.mql.addListener(this.handleMatchChange);
            }

            componentWillUnmount() {
                releaseMatchMedia(query);
                this.mql.removeListener(this.handleMatchChange);
                this.mql = null;
            }

            render() {
                return React.createElement(Component, {
                    ...this.props,
                    [propName]: this.state.matched
                });
            }

            @autobind
            handleMatchChange(mql) {
                this.setState({
                    matched: mql.matches
                });
            }
        };
    };
}
