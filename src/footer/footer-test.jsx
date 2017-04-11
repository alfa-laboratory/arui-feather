/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Footer from './footer';

describe('footer', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let footer = render(<Footer />);

        expect(footer.node).to.exist;
    });

    it('should render custom text from property `additional` inside additional block', () => {
        let text = 'Made in AlfaLab';
        let footer = render(<Footer additional={ text } />);
        let footerAdditionalNode = footer.node.querySelector('.footer__additional');

        expect(footerAdditionalNode).to.have.text(text);
    });

    it('should render content from property `menu` inside menu block', () => {
        let menuContent = 'Menu';
        let footer = render(<Footer menu={ menuContent } />);
        let footerMenuNode = footer.node.querySelector('.footer__menu');

        expect(footerMenuNode).to.have.text(menuContent);
    });
});
