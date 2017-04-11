/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import User from './user';

describe('user', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let user = render(<User url='#' text='user' />);

        expect(user.node).to.exist;
        expect(user.node).to.have.class('user');
    });

    it('should call `onClick` callback after user was clicked', () => {
        let onClick = chai.spy();
        let user = render(<User onClick={ onClick } text='user' />);

        user.node.click();

        expect(onClick).to.have.been.called.once;
    });
});
