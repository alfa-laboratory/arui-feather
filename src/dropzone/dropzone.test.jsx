/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Dropzone from './dropzone';

describe('dropzone', () => {
    it('should render without problems', () => {
        let dropzone = mount(<Dropzone />);

        expect(dropzone).toMatchSnapshot();
    });
});
