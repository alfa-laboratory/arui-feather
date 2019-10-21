/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { mount } from 'enzyme';
import { getMatchMedia } from '../lib/match-media';
import Mq from './mq';

jest.mock('modernizr', () => ({ pointerevents: true }));
jest.mock('../lib/match-media');

describe('mq', () => {
    it('should not mount this.props.children on conditions mismatch', () => {
        getMatchMedia.mockReturnValueOnce({ addListener: jest.fn, matches: false });
        const mq = mount(<Mq query='--small-only' touch={ true }>Content</Mq>);

        expect(mq.children().length).toBe(0);
    });

    it('should mount with matching query and matching touch screen', () => {
        getMatchMedia.mockReturnValueOnce({ addListener: jest.fn, matches: true });
        const mq = mount(<Mq query='--small-only' touch={ true }>Content</Mq>);

        expect(mq.text()).toBe('Content');
    });

    it('should mount with matching query and missing touch', () => {
        getMatchMedia.mockReturnValueOnce({ addListener: jest.fn, matches: true });
        const mq = mount(<Mq query='--small-only'>Content</Mq>);

        expect(mq.text()).toBe('Content');
    });

    it('should mount with missing query and matching touch screen', () => {
        const mq = mount(<Mq touch={ true }>Content</Mq>);

        expect(mq.text()).toBe('Content');
    });

    it('should mount with missing query and missing touch', () => {
        const mq = mount(<Mq>Content</Mq>);

        expect(mq.text()).toBe('Content');
    });

    it('should not mount with non-matching query', () => {
        const mq = mount(<Mq query='--non-matching-query'><div /></Mq>);

        expect(mq.children().length).toBe(0);
    });
});
