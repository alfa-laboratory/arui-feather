/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Icon from './icon';

describe('icon', () => {
    afterEach(cleanUp);

    it('renders without problems', () => {
        let icon = render(<Icon />);
        expect(icon.node).to.have.exist;
    });

    (() => {
        let icons = [
            'action-check', 'action-down', 'action-error', 'action-fail',
            'action-ok', 'action-ok-filled', 'action-up', 'tool-attachment', 'tool-calendar', 'tool-close'
        ];

        return icons.forEach(name => (
            it(`render ${name} icon without problems`, () => {
                let icon = render(<Icon name={ name } />);

                expect(icon.node).to.have.class(`icon_name_${name}`);
            })
        ));
    })();
});
