/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import InlineError from './inline-error';

describe('inline-error', () => {
    afterEach(cleanUp);

    it('renders without problems', () => {
        let error = render(<InlineError>Error content</InlineError>);

        expect(error.node).to.exist;
        expect(error.node).to.have.text('Error content');
    });
});
