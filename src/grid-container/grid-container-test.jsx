/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import GridContainer from './grid-container';

describe('grid-container', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let container = render(<GridContainer>GridContainer-example</GridContainer>);

        expect(container.node).to.exist;
        expect(container.node.tagName).to.equal('DIV');
        expect(container.node).to.have.text('GridContainer-example');
        expect(container.node).to.have.class('arui-container');
        expect(container.node).to.have.class('arui-container_gutter_16');
    });

    it('should set class for gutter', () => {
        let container = render(
            <GridContainer
                gutter={ { sm: 8, xl: 16, xxl: 24 } }
            >
                GridContainer-example
            </GridContainer>
        );

        expect(container.node).to.have.class('arui-container_gutter-sm_8');
        expect(container.node).to.have.class('arui-container_gutter-xl_16');
        expect(container.node).to.have.class('arui-container_gutter-xxl_24');
    });
});
