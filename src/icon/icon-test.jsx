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
            'error', 'fail', 'ok', 'ok-filled', 'calendar', 'search', 'close', 'user'
        ];

        return icons.forEach(iconItem => (
            it(`render ${iconItem} icon without problems`, () => {
                let icon = render(<Icon name={ iconItem } />);

                expect(icon.node).to.have.class(`icon_${iconItem}`);
            })
        ));
    })();

    it('should call `onClick` callback after icon was clicked', () => {
        let onClick = sinon.spy();
        let icon = render(<Icon onClick={ onClick } />);

        icon.node.click();

        expect(onClick).to.have.been.calledOnce;
    });
});
