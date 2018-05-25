/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ListHeader from './list-header';

describe('list-header', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let listHeader = render(<ListHeader title='Title' />);

        expect(listHeader.node).to.exist;
        expect(listHeader.node).to.have.text('Title');
    });

    it('should render with `description` prop passed', () => {
        let listHeader = render(<ListHeader title='Title' description='description' />);

        expect(listHeader.node).to.exist;
        // expect(listHeader.node).to.have.text('Title');
    });
});
