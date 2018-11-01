/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Spin from './spin';

describe('spin', () => {
    it('should render without problems', () => {
        let spin = mount(<Spin />);

        expect(spin).toMatchSnapshot();
    });

    it('should set class `spin_visible` when visible=true', () => {
        let spin = mount(<Spin visible={ true } />);

        expect(spin.getDOMNode().className).toContain('spin_visible');
    });
});
