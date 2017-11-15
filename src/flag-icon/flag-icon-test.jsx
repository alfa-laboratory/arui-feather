/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import FlagIcon from './flag-icon';

describe('flag-icon', () => {
    afterEach(cleanUp);

    it('renders without problems', () => {
        let flagIcon = render(<FlagIcon />);
        expect(flagIcon.node).to.have.exist;
    });
});
