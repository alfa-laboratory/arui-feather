/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import useMedia from './useMedia';
import { getMatchMedia } from '../lib/match-media';

jest.mock('../lib/match-media');
jest.mock('./utils', () => ({
    isPointerEventsSupported: jest.fn(() => true)
}));

const getMatchMediaMocked = getMatchMedia as jest.Mock;

describe('useMedia', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(React, 'useEffect');
    });

    it('should try to reconcile each time', () => {
        getMatchMediaMocked.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: false
        });

        const ref = React.createRef<HTMLDivElement>();
        const text = () => ref.current.textContent;
        const Example = () => {
            const matches = useMedia('--small-only');

            return <h1 ref={ ref }>{ `${matches}` }</h1>;
        };

        const test1 = mount(<Example />);

        expect(text()).toEqual('false');
        expect(React.useEffect).toHaveBeenCalledTimes(1);
        test1.unmount();
        test1.mount();
        expect(text()).toEqual('false');
        expect(React.useEffect).toHaveBeenCalledTimes(2);
    });

    it('should be able to change the query dynamically', () => {
        getMatchMediaMocked.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: false
        });
        const ref = React.createRef<HTMLDivElement>();
        const text = () => ref.current.textContent;

        type Props = {
            query: string;
        }

        const Example = ({ query }: Props) => {
            const matches = useMedia(query);

            return <h1 ref={ ref }>{ `${matches}` }</h1>;
        };

        const test = mount(<Example query='--small-only' />);

        expect(text()).toEqual('false');
        expect(React.useEffect).toHaveBeenCalledTimes(1);

        getMatchMediaMocked.mockReturnValue({
            addListener: jest.fn,
            removeListener: jest.fn,
            matches: true
        });

        test.setProps({ query: '--desktop-m' });
        expect(text()).toEqual('true');
        expect(React.useEffect).toHaveBeenCalledTimes(3);
    });
});
