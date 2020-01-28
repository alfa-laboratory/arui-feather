/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

import React from 'react';
import { getMatchMedia, releaseMatchMedia } from '../lib/match-media';

interface ClassDecorator {
    <TFunction extends Function>(target: TFunction): TFunction | void;
}

type MqDecoratorState = {
    matched: boolean;
}

export default function mqDecorator(query: string, propName: string = 'mqMatch'): ClassDecorator {
    return function (Component: React.ComponentType) {
        return class extends React.Component<{}, MqDecoratorState> {
            mql: MediaQueryList | null = null;

            state = {
                matched: false
            };

            componentDidMount() {
                this.mql = getMatchMedia(query);
                this.handleMatchChange(this.mql);
                // TODO: depricated => change to addEventListener
                this.mql.addListener(this.handleMatchChange);
            }

            componentWillUnmount() {
                releaseMatchMedia(query);
                // TODO: depricated => change to removeEventListener
                this.mql.removeListener(this.handleMatchChange);
                this.mql = null;
            }

            render() {
                return React.createElement(Component, {
                    ...this.props,
                    [propName]: this.state.matched
                });
            }

            handleMatchChange = (mql: MediaQueryListEvent) => {
                this.setState({
                    matched: mql.matches
                });
            }
        };
    };
}
