/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import ErrorPage from './error-page';

describe('error-page', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let errorPage = render(<ErrorPage />);

        expect(errorPage.node).to.exist;
    });

    it('should apply custom title', () => {
        let errorPage = render(<ErrorPage title='ErrorTitle-test' />);
        let errorPageTitleNode = errorPage.node.querySelector('.app__title');

        expect(errorPageTitleNode).to.have.text('ErrorTitle-test');
    });

    it('should apply custom title', () => {
        let errorPage = render(<ErrorPage text='ErrorText-test' />);
        let errorPageContentNode = errorPage.node.querySelector('.app__content');

        expect(errorPageContentNode).to.have.text('ErrorText-test');
    });

    it('should render return link', () => {
        let errorToRender = <ErrorPage returnUrl='return-page-url' returnTitle='return-page-title' />;
        let errorPage = render(errorToRender);
        let errorReturnLinkNode = errorPage.node.querySelector('.error-page__return-link');

        expect(errorReturnLinkNode).to.exist;
        expect(errorReturnLinkNode).to.have.class('link');
        expect(errorReturnLinkNode).to.have.attr('href', 'return-page-url');
        expect(errorReturnLinkNode).to.have.text('return-page-title');
    });
});
