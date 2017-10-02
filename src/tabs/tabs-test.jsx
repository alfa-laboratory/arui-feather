/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Tabs from './tabs';

describe('tabs', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let tabs = render(<Tabs />);

        expect(tabs.node).to.exist;
        expect(tabs.node).to.have.class('tabs');
    });

    it('should set scrollable className when scrollable=true without problems', () => {
        let tabs = render(<Tabs />);

        expect(tabs.node).to.exist;
        expect(tabs.node).to.have.class('tabs_scrollable');
    });
});
