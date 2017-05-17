/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
import { Component } from 'react';
import Type from 'prop-types';
import { autobind } from 'core-decorators';
import PlayGroundRendererStyleguidist from 'react-styleguidist/lib/rsg-components/Playground/PlaygroundRenderer';
import cn from '../../../src/cn';
import './index.css';

@cn('playground-with-share-example-button')
export class PlayGroundRenderer extends Component {
    static propTypes = {
        code: Type.string.isRequired
    };

    render(cn) {
        return (
            <div className={ cn }>
                <button className={ cn('share-code') } onClick={ this.handleShareExampleClick }>Share example</button>
                <PlayGroundRendererStyleguidist { ...this.props } />
            </div>
        );
    }

    @autobind
    handleShareExampleClick() {
        const code = encodeURI(this.props.code);
        const pathname = location.pathname;
        window.open(`${pathname}#playground/code=${code}`, '_blank');
    }
}
export default PlayGroundRenderer;
