/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import AppContent from './app-content';

describe('app-content', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let appContent = render(<AppContent>AppContent-test</AppContent>);

        expect(appContent.node).to.exist;
        expect(appContent.node).to.have.text('AppContent-test');
    });
});
