/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import PropTypes from 'prop-types';
import useMedia from './useMedia';
import { getMatchMedia } from '../lib/match-media';

jest.mock('../lib/match-media');
jest.mock('./utils', () => ({
    isPointerEventsSupported: jest.fn(() => true)
}));

describe('useMedia', () => {
    it('should try to reconcile each time', () => {
        getMatchMedia.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: false
        });

        let callCount = 0;
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Example = () => {
            const matches = useMedia('--small-only');

            React.useEffect(() => {
                callCount += 1;
            });

            return <h1 ref={ ref }>{ `${matches}` }</h1>;
        };

        const test1 = mount(<Example />);

        expect(text()).toEqual('false');
        expect(callCount).toEqual(1);
        test1.unmount();
        test1.mount();
        expect(text()).toEqual('false');
        expect(callCount).toEqual(2);
    });

    it('should be able to change the query dynamically', () => {
        getMatchMedia.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: false
        });
        let callCount = 0;
        const ref = React.createRef();
        const text = () => ref.current.textContent;
        const Example = (props) => {
            const matches = useMedia(props.query);

            React.useEffect(() => {
                callCount += 1;
            });

            return <h1 ref={ ref }>{ `${matches}` }</h1>;
        };

        Example.propTypes = {
            query: PropTypes.string.isRequired
        };

        const test = mount(<Example query='--small-only' />);

        expect(text()).toEqual('false');
        expect(callCount).toEqual(1);

        getMatchMedia.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: true
        });

        test.setProps({ query: '--desktop-m' });
        expect(text()).toEqual('true');
        expect(callCount).toEqual(3);
    });
});
