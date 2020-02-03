/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import { Spin } from './spin';
import ThemedSpin from './index';

describe('spin', () => {
    it('should render without problems', () => {
        const spin = mount(<Spin />);

        expect(spin).toMatchSnapshot();
    });

    it('should set class `spin_visible` when visible=true', () => {
        const spin = mount(<Spin visible={ true } />);

        expect(spin.getDOMNode().className).toContain('spin_visible');
    });

    it('should render themed component without problems', () => {
        const spin = mount(<ThemedSpin>Themed label test</ThemedSpin>);

        expect(spin).toMatchSnapshot();
    });

    it('should contains theme class', () => {
        const spin = mount(<ThemedSpin />);

        expect(spin.getDOMNode().className).toContain('spin_theme_alfa-on-white');
    });
});
