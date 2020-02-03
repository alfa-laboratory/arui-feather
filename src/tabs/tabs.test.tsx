/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Tabs } from './tabs';

describe('tabs', () => {
    it('should render without problems', () => {
        const tabs = mount(<Tabs />);

        expect(tabs).toMatchSnapshot();
    });

    it('should set scrollable className when scrollable=true without problems', () => {
        const tabs = mount(<Tabs />);

        expect(tabs.getDOMNode().className).toContain('tabs_scrollable');
    });
});
