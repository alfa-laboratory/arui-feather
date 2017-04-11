/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Highlight from './highlight';

describe('highlight', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let highlight = render(<Highlight>Notice me</Highlight>);

        expect(highlight.node).to.exist;
        expect(highlight.node).to.have.text('Notice me');
    });
});
