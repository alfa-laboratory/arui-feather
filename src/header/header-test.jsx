/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Header from './header';

describe('header', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let header = render(<Header />);

        expect(header.node).to.exist;
    });

    it('should render `Link` with `Logo` and href from property `root`', () => {
        let rootHref = 'alfabank.ru';
        let header = render(<Header root={ rootHref } logo={ <span /> } />);
        let headerLogoLink = header.node.querySelector('.header__logo');

        expect(headerLogoLink).to.have.attr('href', rootHref);
    });

    it('should render content from property `logo` inside logo element', () => {
        let logoContent = 'Custom logo content';
        let header = render(<Header logo={ logoContent } />);
        let headerLogo = header.node.querySelector('.header__logo');

        expect(headerLogo).to.have.text(logoContent);
    });

    it('should render content from property `menu` inside menu block', () => {
        let menuContent = 'Menu';
        let header = render(<Header menu={ menuContent } />);
        let headerMenu = header.node.querySelector('.header__menu');

        expect(headerMenu).to.have.text(menuContent);
    });

    it('should render content from property `user` inside user block', () => {
        let userContent = 'User';
        let header = render(<Header user={ userContent } />);
        let headerMenu = header.node.querySelector('.header__user');

        expect(headerMenu).to.have.text(userContent);
    });

    it('should render content from property `support` inside support block', () => {
        let supportContent = 'Support';
        let header = render(<Header support={ supportContent } />);
        let headerMenu = header.node.querySelector('.header__support');

        expect(headerMenu).to.have.text(supportContent);
    });

    it('should render free content from property `topContent` inside top-content block', () => {
        let topDataContent = 'topContent';
        let header = render(<Header topContent={ topDataContent } />);
        let headerTopContent = header.node.querySelector('.header__top-content');

        expect(headerTopContent).to.have.text(topDataContent);
    });

    it('should call `onResize` callback when header was change height', (done) => {
        let onResize = chai.spy();
        let header = render(<Header onResize={ onResize } />);

        setTimeout(() => {
            // As we don't have component styles in tests,
            // we need to include position styling for proper `onResize` testing.
            header.node.style.position = 'relative';
            header.node.style.height = '200px';

            setTimeout(() => {
                expect(onResize).to.have.been.called.at.least(1);
                done();
            }, 100);
        }, 0);
    });

    it('should call `onClick` callback after logotype was clicked', (done) => {
        let type = '';
        let onClick = chai.spy((event) => { type = event.type; });
        let header = render(<Header onLogoClick={ onClick } logo={ <span /> } />);
        let logoLinkNode = header.node.querySelector('.header__logo');

        simulate(logoLinkNode, 'click');

        setTimeout(() => {
            expect(onClick).to.have.been.called.once;
            expect(type).to.equal('click');
            done();
        }, 0);
    });
});
