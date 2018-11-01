/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import Paragraph from './paragraph';

describe('paragraph', () => {
    it('should render without problems', () => {
        let paragraph = shallow(<Paragraph />);

        expect(paragraph).toMatchSnapshot();
    });

    it('should render block `p` with text inside', () => {
        let paragraph = shallow(<Paragraph>Paragraph text</Paragraph>);

        expect(paragraph.is('p')).toBe(true);
        expect(paragraph.text()).toContain('Paragraph text');
    });

    it('should render marker from property `mark` before text', () => {
        let paragraph = shallow(<Paragraph mark='!Important '>Paragraph text</Paragraph>);
        let paragraphMarkerNode = paragraph.childAt(0);

        expect(paragraphMarkerNode.hasClass('paragraph__marker')).toBe(true);
        expect(paragraphMarkerNode.text()).toBe('!Important ');
    });
});
