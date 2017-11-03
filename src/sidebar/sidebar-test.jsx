/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import bowser from 'bowser';
import { render, cleanUp } from '../test-utils';
import getScrollbarWidth from '../lib/scrollbar-width';

import Sidebar from './sidebar';

describe('sidebar component', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let sidebar = render(<Sidebar visible={ true }>defaultText</Sidebar>);

        expect(sidebar.node).to.exist;
        expect(sidebar.node.querySelector('.sidebar__content')).to.have.text('defaultText');
    });

    it('should render cross icon by default', () => {
        let sidebar = render(<Sidebar visible={ true }>defaultText</Sidebar>);
        let closeIcon = sidebar.node.querySelector('.sidebar__closer');

        expect(closeIcon).to.exist;
    });

    it('shouldn`t render cross icon with special param', () => {
        let sidebar = render(<Sidebar visible={ true } hasCloser={ false }>defaultText</Sidebar>);
        let closeIcon = sidebar.node.querySelector('.sidebar__closer');

        expect(closeIcon).to.not.exist;
    });


    it('should call `onCloserClick` callback after cross icon was clicked', () => {
        let onClick = sinon.spy();
        let sidebar = render(
            <Sidebar
                visible={ true }
                hasCloser={ true }
                onCloserClick={ onClick }
            >
                defaultText
            </Sidebar>
        );
        let closeIcon = sidebar.node.querySelector('.sidebar__closer .icon-button');

        closeIcon.click();

        expect(onClick).to.have.been.calledOnce;
    });

    if (!bowser.mobile) {
        it('should render with `width` from props', () => {
            let sidebar = render(
                <Sidebar
                    visible={ true }
                    width={ 500 }
                >
                    defaultText
                </Sidebar>
            );

            expect(sidebar.node).to.have.attr('style', `width: ${500 + getScrollbarWidth()}px;`);
        });
    }
});
