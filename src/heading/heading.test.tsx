/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import { Heading } from './heading';

describe('heading', () => {
    it('should render without problem', () => {
        const heading = shallow(<Heading size='s'>Heading</Heading>);

        expect(heading).toMatchSnapshot();
    });

    const sizes = ['xs', 's', 'm', 'l', 'xl'] as const;
    const headingLevel = {
        xl: 1,
        l: 2,
        m: 3,
        s: 4,
        xs: 5
    };

    sizes.forEach(size => (
        it(`should render Heading size=\`${size}\` with tag H${headingLevel[size]}`, () => {
            const heading = shallow(<Heading size={ size }>Heading</Heading>);

            expect(heading.is(`h${headingLevel[size]}`));
        })
    ));
});
