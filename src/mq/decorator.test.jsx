/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/no-multi-comp: 0 */
import React from 'react';
import Type from 'prop-types';
import { mount } from 'enzyme';
import { getMatchMedia } from '../lib/match-media';
import mqDecorator from './decorator';

jest.mock('../lib/match-media');
jest.mock('../modernizr', () => ({ pointerevents: true }));

describe('mq-decorator', () => {
    it('should pass mqMatch property to decorated component', () => {
        getMatchMedia.mockReturnValueOnce({
            addListener: jest.fn,
            matches: false
        });

        @mqDecorator('--small-only')
        class Example extends React.Component {
            static propTypes = {
                mqMatch: Type.bool
            };

            render() {
                return this.props.mqMatch ? <div /> : null;
            }
        }


        let result = mount(<Example />);

        expect(result.find('Example').props().mqMatch).toBe(false);
    });

    it('should pass custom named property to decorated component', () => {
        getMatchMedia.mockReturnValueOnce({
            addListener: jest.fn,
            matches: false
        });

        @mqDecorator('--small-only', 'isSmall')
        class Example extends React.Component {
            static propTypes = {
                isSmall: Type.bool
            };

            render() {
                return this.props.isSmall ? <div /> : null;
            }
        }

        let result = mount(<Example />);

        expect(result.find('Example').props().isSmall).toBe(false);
    });
});
