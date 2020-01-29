/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import IsolatedContainer from './isolated-container';

describe('isolated-container', () => {
    it('should render without problems', () => {
        const isolatedContainer = mount(<IsolatedContainer />);

        expect(isolatedContainer).toMatchSnapshot();
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const isolatedContainer = mount<IsolatedContainer>(<IsolatedContainer />);

        const node = isolatedContainer.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
