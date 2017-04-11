/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Copyright from './copyright';

describe('copyright', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let copyright = render(<Copyright />);

        expect(copyright.node).to.exist;
        expect(copyright.node).to.have.class('copyright');
    });
});
