/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { TabItem } from './tab-item';

describe('tab-item', () => {
    it('renders without problems', () => {
        const tabItem = mount(<TabItem />);

        expect(tabItem).toMatchSnapshot();
    });
});
