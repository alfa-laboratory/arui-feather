/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Popup from '../popup/popup';
import PopupContainerProvider from './popup-container-provider';

describe('popup-container-provider', () => {
    it('should render without problems', () => {
        let popupContainerProvider = shallow(
            <PopupContainerProvider>
                <div>Render-test</div>
            </PopupContainerProvider>
        );

        expect(popupContainerProvider).toMatchSnapshot();
    });

    it('should render child', () => {
        let popupContainer = shallow(
            <PopupContainerProvider>
                <div>Render-test</div>
            </PopupContainerProvider>
        );

        expect(popupContainer.text()).toContain('Render-test');
    });

    it(`should set childContext with
        isInFixedContainer = true,
        renderContainerElement = HTMLElement to which popup will be appended,
        positioningContainerElement = HTMLElement in which popup will try to fit`, () => {
        let popupContainer = mount(
            <PopupContainerProvider>
                <div>Render-test</div>
            </PopupContainerProvider>
        );
        let childContext = popupContainer.instance().getChildContext();

        expect(childContext.isInCustomContainer).toBe(true);
        expect(childContext.positioningContainerElement).toBe(popupContainer.getDOMNode());
        expect(childContext.renderContainerElement.tagName).toBe('DIV');
    });

    it('should render children popups inside itself’s DOM node', () => {
        let popupContainer = mount(
            <PopupContainerProvider>
                <Popup target='position'>Render-test</Popup>
            </PopupContainerProvider>
        );
        let popupNode = popupContainer.find('.popup');

        expect(popupNode.length).toBe(1);
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let popupContainer = mount(
            <PopupContainerProvider>
                <Popup target='position'>Render-test</Popup>
            </PopupContainerProvider>
        );

        let node = popupContainer.instance().getNode();

        expect(node).toBeInstanceOf(HTMLDivElement);
        expect(node).toBe(popupContainer.getDOMNode());
    });
});
