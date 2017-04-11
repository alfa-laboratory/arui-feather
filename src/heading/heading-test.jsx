/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Heading from './heading';

describe('heading', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let heading = render(<Heading size='s'>Heading</Heading>);

        expect(heading.node).to.exist;
        expect(heading.node).to.have.text('Heading');
    });

    (function () {
        let sizes = ['s', 'm', 'l', 'xl'];
        let headingLevel = {
            xl: 1,
            l: 2,
            m: 3,
            s: 4
        };

        return sizes.forEach(size => (
            it(`should render Heading size=\`${size}\` with tag H${headingLevel[size]}`, () => {
                let heading = render(<Heading size={ size }>Heading</Heading>);

                expect(heading.node.tagName).to.equal(`H${headingLevel[size]}`);
            })
        ));
    }());
});
