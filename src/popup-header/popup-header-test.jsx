/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import PopupHeader from './popup-header';

describe('popup-header', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let popupHeader = render(<PopupHeader title='Title' />);

        expect(popupHeader.node).to.exist;
        expect(popupHeader.node).to.have.text('Title');
    });
});
