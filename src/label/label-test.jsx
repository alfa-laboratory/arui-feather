/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Label from './label';

describe('label', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let label = render(<Label>Label-test</Label>);

        expect(label.node).to.exist;
    });

    it('should render with size=`m` by default', () => {
        let label = render(<Label />);

        expect(label.node).to.have.class('label_size_m');
    });
});
