/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import { Label } from './label';

describe('label', () => {
    it('should render without problems', () => {
        const label = mount(<Label>Label-test</Label>);

        expect(label).toMatchSnapshot();
    });

    it('should render with size=`m` by default', () => {
        const label = mount(<Label />);

        expect(label.getDOMNode().className).toContain('label_size_m');
    });
});
