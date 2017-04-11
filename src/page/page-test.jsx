/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Page from './page';
import Header from '../header/header';

describe('page', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let page = render(<Page />);

        expect(page.node).to.exist;
        expect(page.node).to.have.class('page');
    });

    it('should render page with content inside', () => {
        let page = render(<Page>Page-content</Page>);
        let contentNode = page.node.querySelector('.page__content');

        expect(contentNode).to.have.text('Page-content');
    });

    it('should render header node before content', () => {
        let page = render(<Page header={ <Header /> }>Page-content</Page>);
        let contentNode = page.node.querySelector('.page__inner');
        let headerNode = contentNode.previousSibling;

        expect(headerNode).to.exist;
        expect(headerNode).to.have.class('header');
    });

    it('should render footer node after content', () => {
        let page = render(<Page footer={ <div>footer</div> }>Page-content</Page>);
        let contentNode = page.node.querySelector('.page__inner');

        expect(contentNode.nextSibling).to.have.text('footer');
    });
});
