/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import GridCol from './grid-col';

describe('grid-col', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let col = render(<GridCol>GridCol-example</GridCol>);
        expect(col.node).to.exist;
        expect(col.node.tagName).to.equal('DIV');
        expect(col.node).to.have.text('GridCol-example');
        expect(col.node).to.have.class('grid-col');
    });

    it('should set adaptive classes', () => {
        let col = render(
            <GridCol
                width='available'
                sm='auto'
                lg='2'
                xxl={ 5 }
            >
                GridCol-example
            </GridCol>
        );

        expect(col.node).to.have.class('grid-col_available');
        expect(col.node).to.have.class('grid-col_sm_auto');
        expect(col.node).to.have.class('grid-col_lg_2');
        expect(col.node).to.have.class('grid-col_xxl_5');
    });

    it('should set class for offset/order', () => {
        let col = render(
            <GridCol
                offset={ 4 }
                order={ { sm: 2, xxl: 5 } }
            >
                GridCol-example
            </GridCol>
        );

        expect(col.node).to.have.class('grid-col_offset_4');
        expect(col.node).to.have.class('grid-col_order-sm_2');
        expect(col.node).to.have.class('grid-col_order-xxl_5');
    });
});
