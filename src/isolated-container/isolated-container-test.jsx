/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import IsolatedContainer from './isolated-container';

describe('isolated-container', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let isolatedContainer = render(<IsolatedContainer />);

        expect(isolatedContainer.node).to.exist;
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let isolatedContainer = render(<IsolatedContainer />);

        let node = isolatedContainer.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(isolatedContainer.node);
    });
});
