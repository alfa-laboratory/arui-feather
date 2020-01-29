/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/no-multi-comp: 0 */
import React from 'react';
import { mount } from 'enzyme';
import { getMatchMedia } from '../lib/match-media';
import mqDecorator from './decorator';

jest.mock('../lib/match-media');
jest.mock('./utils', () => ({
    isPointerEventsSupported: jest.fn(() => true)
}));

describe('mq-decorator', () => {
    it('should pass mqMatch property to decorated component', () => {
        (getMatchMedia as any).mockReturnValueOnce({
            addListener: jest.fn,
            matches: false
        });

        type ExampleProps = {
            mqMatch?: boolean;
        }

        @mqDecorator('--small-only')
        class Example extends React.Component<ExampleProps> {
            render() {
                return this.props.mqMatch ? <div /> : null;
            }
        }

        const result = mount<Example>(<Example />);

        expect((result.find('Example') as any).props().mqMatch).toBe(false);
    });

    it('should pass custom named property to decorated component', () => {
        (getMatchMedia as any).mockReturnValueOnce({
            addListener: jest.fn,
            matches: false
        });

        type ExampleProps = {
            isSmall?: boolean;
        }

        @mqDecorator('--small-only', 'isSmall')
        class Example extends React.Component<ExampleProps> {
            render() {
                return this.props.isSmall ? <div /> : null;
            }
        }

        const result = mount<Example>(<Example />);

        expect((result.find('Example').props() as any).isSmall).toBe(false);
    });
});
