/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Support from './support';

describe('support', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let support = render(<Support />);

        expect(support.node).to.exist;
    });

    it('should render `Link` with text from property `phone`', () => {
        let phone = '+7 123 123 12 31';
        let support = render(<Support phone={ phone } />);
        let supportPhoneNode = support.node.querySelector('.support__phone');

        expect(supportPhoneNode).to.have.text(phone);
    });

    it('should call `onPhoneClick` callback after phone Link was clicked', () => {
        let onPhoneClick = chai.spy();
        let support = render(<Support onPhoneClick={ onPhoneClick } phone='+7 123 123 12 31' />);
        let supportPhoneLinkNode = support.node.querySelector('.support__phone').firstChild;

        supportPhoneLinkNode.click();

        expect(onPhoneClick).to.have.been.called.once;
    });

    it('should render `Link` with text from property `city`', () => {
        let city = 'Москва';
        let support = render(<Support city={ city } />);
        let supportCityNode = support.node.querySelector('.support__city');

        expect(supportCityNode).to.have.text(city);
    });

    it('should call `onCityClick` callback after city `Link` was clicked', () => {
        let onCityClick = chai.spy();
        let support = render(<Support onCityClick={ onCityClick } city='Москва' />);
        let supportCityLinkNode = support.node.querySelector('.support__city').firstChild;

        supportCityLinkNode.click();

        expect(onCityClick).to.have.been.called.once;
    });
});
