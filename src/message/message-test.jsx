/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Message from './message';

describe('message', () => {
    afterEach(cleanUp);

    it('should render text message by default', () => {
        let message = render(<Message>Message-example</Message>);

        expect(message.node).to.exist;
        expect(message.node).to.have.text('Message-example');
        expect(message.node).to.have.class('message');
    });
});
