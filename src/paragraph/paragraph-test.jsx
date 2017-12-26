/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Paragraph from './paragraph';

describe('paragraph', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let paragraph = render(<Paragraph />);

        expect(paragraph.node).to.exist;
    });

    it('should render block `p` with text inside', () => {
        let paragraph = render(<Paragraph>Paragraph text</Paragraph>);

        expect(paragraph.node.tagName).to.equal('P');
        expect(paragraph.node).to.have.text('Paragraph text');
    });

    it('should render marker from property `mark` before text', () => {
        let paragraph = render(<Paragraph mark='!Important '>Paragraph text</Paragraph>);
        let paragraphMarkerNode = paragraph.node.firstElementChild;

        expect(paragraphMarkerNode).to.have.class('paragraph__marker');
        expect(paragraphMarkerNode).to.have.text('!Important ');
    });
});
