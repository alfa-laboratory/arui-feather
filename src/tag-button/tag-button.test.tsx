/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { TagButton } from './tag-button';

describe('tag-button', () => {
    it('renders without problems', () => {
        const tagButton = mount(<TagButton />);

        expect(tagButton).toMatchSnapshot();
    });
});
