/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { IconButton } from './icon-button';

describe('icon-button', () => {
    it('renders without problems', () => {
        const iconButton = mount(<IconButton />);

        expect(iconButton).toMatchSnapshot();
    });
});
