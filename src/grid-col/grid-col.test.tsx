/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import GridCol from './grid-col';

describe('grid-col', () => {
    it('should render without problems', () => {
        const col = shallow(<GridCol />);

        expect(col).toMatchSnapshot();
    });

    it('should set classes for column width', () => {
        const col = mount(
            <GridCol width={ { mobile: 12, tablet: 6, desktop: { s: 4 } } }>
                GridCol-test
            </GridCol>
        );

        const colClassName = col.getDOMNode().className;

        expect(colClassName).toContain('grid-col_width-mobile_12');
        expect(colClassName).toContain('grid-col_width-tablet_6');
        expect(colClassName).toContain('grid-col_width-desktop-s_4');
    });
});
