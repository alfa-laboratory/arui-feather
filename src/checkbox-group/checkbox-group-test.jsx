/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ChecBoxGroup from './checkbox-group';
import ChecBox from '../checkbox/checkbox';

describe('checkbox-group', () => {
    afterEach(cleanUp);

    it('should render without children', () => {
        let checkboxGroup = render(<ChecBoxGroup />);

        expect(checkboxGroup.node).to.exist;
    });

    it('should render with only one children', () => {
        let checkboxGroup = render(
            <ChecBoxGroup>
                <ChecBox key='1' />
            </ChecBoxGroup>
        );

        expect(checkboxGroup.node).to.exist;
        expect(checkboxGroup.node).to.have.class('checkbox-group');
        expect(checkboxGroup.node).to.have.class('control-group');
    });

    it('should render with many checkbox children without problems', () => {
        let checkboxGroup = render(
            <ChecBoxGroup>
                <ChecBox key='1' text='label' />
                <ChecBox key='2' text='label' />
            </ChecBoxGroup>
        );

        expect(checkboxGroup.node).to.exist;
        expect(checkboxGroup.node).to.have.class('checkbox-group');
        expect(checkboxGroup.node).to.have.class('control-group');
    });
});
