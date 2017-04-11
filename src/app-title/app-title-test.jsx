/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import AppTitle from './app-title';

describe('app-title', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let appTitle = render(<AppTitle>AppTitle-test</AppTitle>);

        expect(appTitle.node).to.exist;
        expect(appTitle.node).to.have.text('AppTitle-test');
    });
});
