/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import List from './list';

describe('list', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let list = render(<List />);

        expect(list.node).to.exist;
        expect(list.node).to.have.class('list');
    });

    it('should render ul type without problem', () => {
        const ITEMS_UL = [
            {
                key: 'one',
                value: 'Apple'
            },
            {
                key: 'two',
                value: 'Orange'
            },
            {
                key: 'three',
                value: 'Banana'
            }
        ];

        let list = render(<List items={ ITEMS_UL } type='ordered' />);

        expect(list.node).to.exist;
        expect(list.node).to.have.class('list_type_ordered');
    });
});
