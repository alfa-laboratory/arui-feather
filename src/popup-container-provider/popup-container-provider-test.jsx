/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Popup from '../popup/popup';
import PopupContainerProvider from './popup-container-provider';

describe('popup-container-provider', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let popupContainerProvider = render(
            <PopupContainerProvider>
                <div>Render-test</div>
            </PopupContainerProvider>
        );

        expect(popupContainerProvider.node).to.exist;
    });

    it('should render child', () => {
        let popupContainer = render(
            <PopupContainerProvider>
                <div>Render-test</div>
            </PopupContainerProvider>
        );

        expect(popupContainer.node).to.exist;
        expect(popupContainer.node).to.have.text('Render-test');
    });

    it(`should set childContext with
        isInFixedContainer = true,
        renderContainerElement = HTMLElement to which popup will be appended,
        positioningContainerElement = HTMLElement in which popup will try to fit`,
        () => {
            let popupContainer = render(
                <PopupContainerProvider>
                    <div>Render-test</div>
                </PopupContainerProvider>
            );
            let childContext = popupContainer.instance.getChildContext();

            expect(childContext.isInCustomContainer).to.equal(true);
            expect(childContext.positioningContainerElement).to.equal(popupContainer.node);
            expect(childContext.renderContainerElement.tagName).to.equal('DIV');
        }
    );

    it('should render children popups inside itself’s DOM node', () => {
        let popupContainer = render(
            <PopupContainerProvider>
                <Popup target='position'>Render-test</Popup>
            </PopupContainerProvider>
        );
        let popupNode = popupContainer.node.querySelector('.popup');

        expect(popupNode).to.exist;
    });
});
