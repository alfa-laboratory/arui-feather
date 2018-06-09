/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import GridRow from './grid-row';
import GridCol from '../grid-col';

describe('grid-row', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let row = render(<GridRow>GridRow-example</GridRow>);
        expect(row.node).to.exist;
        expect(row.node.tagName).to.equal('DIV');
        expect(row.node).to.have.text('GridRow-example');
        expect(row.node).to.have.class('arui-row');
        expect(row.node).to.have.class('arui-row_gutter_16');
    });

    it('should set class for gutter', () => {
        let row = render(
            <GridRow gutter={ { sm: 8, xl: 16, xxl: 24 } }>
                <GridCol>
                    GridRow-example
                </GridCol>
            </GridRow>
        );
        let colNode = row.node.querySelector('.arui-col');
        expect(row.node).to.have.class('arui-row_gutter-sm_8');
        expect(row.node).to.have.class('arui-row_gutter-xl_16');
        expect(row.node).to.have.class('arui-row_gutter-xxl_24');
        expect(colNode).to.have.class('arui-col_gutter-sm_8');
        expect(colNode).to.have.class('arui-col_gutter-xl_16');
        expect(colNode).to.have.class('arui-col_gutter-xxl_24');
    });
});
