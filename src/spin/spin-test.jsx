/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Spin from './spin';

describe('spin', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let spin = render(<Spin />);

        expect(spin.node).to.exist;
    });

    it('should set class `spin_visible` when visible=true', () => {
        let spin = render(<Spin visible={ true } />);

        expect(spin.node).to.have.class('spin_visible');
    });
});
