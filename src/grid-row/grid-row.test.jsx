/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import GridRow from './grid-row';
import GridCol from '../grid-col';

describe('grid-row', () => {
    it('should render without problems', () => {
        const row = shallow(<GridRow />);

        expect(row).toMatchSnapshot();
    });

    it('should set default classes for gutter', () => {
        const row = mount(
            <GridRow>
                <GridCol>
                    GridRow-test
                </GridCol>
            </GridRow>
        );

        const rowClassName = row.getDOMNode().className;
        const colClassName = row.find('.grid-col').getDOMNode().className;

        expect(rowClassName).toContain('grid-row_gutter-mobile-s_16');
        expect(rowClassName).toContain('grid-row_gutter-desktop-m_24');
        expect(colClassName).toContain('grid-col_gutter-mobile-s_16');
        expect(colClassName).toContain('grid-col_gutter-desktop-m_24');
    });

    it('should set custom classes for gutter', () => {
        const row = mount(
            <GridRow gutter={ { mobile: 0, tablet: 16, desktop: { s: 24 } } }>
                <GridCol>
                    GridRow-test
                </GridCol>
            </GridRow>
        );

        const rowClassName = row.getDOMNode().className;
        const colClassName = row.find('.grid-col').getDOMNode().className;

        expect(rowClassName).toContain('grid-row_gutter-mobile_0');
        expect(rowClassName).toContain('grid-row_gutter-tablet_16');
        expect(rowClassName).toContain('grid-row_gutter-desktop-s_24');
        expect(colClassName).toContain('grid-col_gutter-mobile_0');
        expect(colClassName).toContain('grid-col_gutter-tablet_16');
        expect(colClassName).toContain('grid-col_gutter-desktop-s_24');
    });
});
