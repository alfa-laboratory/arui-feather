/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import AppMenu from './app-menu';

describe('app-menu', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let appMenu = render(<AppMenu>AppMenu-test</AppMenu>);

        expect(appMenu.node).to.exist;
        expect(appMenu.node).to.have.text('AppMenu-test');
    });
});
