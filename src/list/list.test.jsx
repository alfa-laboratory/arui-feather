/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import List from './list';

describe('list', () => {
    it('should render without problem', () => {
        const list = shallow(<List />);

        expect(list).toMatchSnapshot();
        expect(list.hasClass('list')).toBe(true);
    });

    it('should render ul type without problem', () => {
        const ITEMS_UL = [
            {
                key: 'one',
                value: 'Apple'
            },
            {
                key: 'two',
                value: 'Orange'
            },
            {
                key: 'three',
                value: 'Banana'
            }
        ];

        const list = shallow(<List items={ ITEMS_UL } type='ordered' />);

        expect(list).toMatchSnapshot();
        expect(list.hasClass('list_type_ordered')).toBe(true);
    });
});
