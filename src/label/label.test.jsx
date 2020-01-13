/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';
import Label from './label';
import ThemedLabel from './index';

describe('label', () => {
    it('should render without problems', () => {
        const label = mount(<Label>Label-test</Label>);

        expect(label).toMatchSnapshot();
    });

    it('should render with size=`m` by default', () => {
        const label = mount(<Label />);

        expect(label.getDOMNode().className).toContain('label_size_m');
    });

    it('should render themed component without problems', () => {
        const label = mount(<ThemedLabel>Themed label test</ThemedLabel>);

        expect(label).toMatchSnapshot();
    });

    it('should contains theme class', () => {
        const label = mount(<ThemedLabel />);

        expect(label.getDOMNode().className).toContain('label_theme_alfa-on-white');
    });
});
