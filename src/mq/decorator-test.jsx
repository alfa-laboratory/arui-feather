/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/no-multi-comp: 0 */
import React from 'react';
import Type from 'prop-types';
import { render, cleanUp } from '../test-utils';
import mqDecorator from './decorator';

const IS_SMALL_ONLY = (window.innerWidth || document.documentElement.clientWidth ||
    document.body.clientWidth) <= 640;

describe('mq-decorator', () => {
    afterEach(cleanUp);

    it('should pass mqMatch property to decorated component', () => {
        @mqDecorator('--small-only')
        class Example extends React.Component {
            static propTypes = {
                mqMatch: Type.bool
            };

            render() {
                return this.props.mqMatch ? <div /> : null;
            }
        }

        let result = render(<Example />);

        if (IS_SMALL_ONLY) {
            expect(result.node).to.exist;
        } else {
            expect(result.node).to.not.exist;
        }
    });

    it('should pass custom named property to decorated component', () => {
        @mqDecorator('--small-only', 'isSmall')
        class Example extends React.Component {
            static propTypes = {
                isSmall: Type.bool
            };

            render() {
                return this.props.isSmall ? <div /> : null;
            }
        }

        let result = render(<Example />);

        if (IS_SMALL_ONLY) {
            expect(result.node).to.exist;
        } else {
            expect(result.node).to.not.exist;
        }
    });
});
