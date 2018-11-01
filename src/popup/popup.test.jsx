/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Popup from './index';

function renderPopup(popupProps, anchorProps) {
    let popup;
    let anchor;

    if (popupProps) {
        let popupContainer = document.createElement('div');
        document.body.appendChild(popupContainer);

        popup = mount(
            <Popup { ...popupProps }>{ popupProps.children || 'Popup' }</Popup>,
            {
                container: popupContainer
            }
        );

        // Render in container workaround.
        // popup.node = document.body.querySelector('.popup');
    }

    if (anchorProps) {
        let anchorContainer = document.createElement('div');
        document.body.appendChild(anchorContainer);

        anchor = mount(
            <div { ...anchorProps }>Target</div>,
            {
                container: anchorContainer
            }
        );
    }

    let popupHeaderNode;
    if (popup) {
        popupHeaderNode = popup.find('.popup__header');
    }

    let popupContentNode;
    if (popup) {
        popupContentNode = popup.find('.popup__content');
    }

    if (popup && anchor) {
        popup.instance().setTarget(anchor.getDOMNode());
    }

    return {
        popup,
        anchor,
        popupHeaderNode,
        popupContentNode
    };
}

describe('popup', () => {
    it('should set anchor target', () => {
        let { popup, anchor } = renderPopup({}, {});

        popup.instance().setTarget(anchor.getDOMNode());

        expect(popup.instance().anchor).toBe(anchor.getDOMNode());
    });

    it('should throw Error without setting anchor target', () => {
        let { popup } = renderPopup({}, null);

        expect(popup.instance().redraw).toThrow('Cannot show popup without target or position');
    });

    it('should set position', () => {
        let { popup } = renderPopup({ target: 'position' }, null);

        popup.instance().setPosition(100, 200);

        expect(popup.instance().position).toEqual({ left: 100, top: 200 });
    });

    it('should throw Error with target=`position` but without setting position', () => {
        let { popup } = renderPopup({ target: 'position' }, null);

        expect(popup.instance().redraw).toThrow('Cannot show popup without target or position');
    });

    it('should render text inside', () => {
        let { popup } = renderPopup({}, {});

        expect(popup.text()).toContain('Popup');
    });

    it('should set data-for when `for` prop is set', () => {
        let { popup } = renderPopup({ for: 'example' }, {});

        expect(popup.children().prop('data-for')).toBe('example');
    });

    it('should have tooltip with target=`anchor` and type=`tooltip`', () => {
        let { popup } = renderPopup({ type: 'tooltip' }, {});

        expect(popup.children().props().className).toContain('popup_type_tooltip');
    });

    it('should not have tooltip with target=`position` and type=`tooltip`', () => {
        let { popup } = renderPopup({
            target: 'position',
            type: 'tooltip'
        }, null);

        popup.instance().setPosition(100, 200);

        expect(popup.children().props().className).not.toContain('popup_type_tooltip');
    });

    it('should call `onMouseEnter` callback after popup was hovered', () => {
        let onMouseEnter = jest.fn();
        let { popup } = renderPopup({ onMouseEnter }, {});

        popup.children().simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after popup was unhovered', () => {
        let onMouseLeave = jest.fn();
        let { popup } = renderPopup({ onMouseLeave }, {});

        popup.children().simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should call `onClickOutside` callback after click outside popup', (done) => {
        let onClickOutside = jest.fn();
        renderPopup({ onClickOutside, visible: true }, {});

        let outsideElement = document.createElement('div');
        outsideElement.setAttribute('style',
            'width: 100px; height: 100px; position: absolute; left: 500px; top: 500px;'
        );
        document.body.appendChild(outsideElement);

        setTimeout(() => {
            outsideElement.click();
            expect(onClickOutside).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should not call `onClickOutside` callback after click inside popup', (done) => {
        let onClickOutside = jest.fn();
        let { popupContentNode } = renderPopup({ onClickOutside, visible: true }, {});

        setTimeout(() => {
            popupContentNode.simulate('click');
            expect(onClickOutside).not.toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should not render a header element by default', () => {
        let { popupHeaderNode } = renderPopup({ visible: true }, {});

        expect(popupHeaderNode.length).toBe(0);
    });

    it('should render a header element when header parameter is present', () => {
        let { popupHeaderNode } = renderPopup({ header: <div />, visible: true }, {});

        expect(popupHeaderNode.length).toBe(1);
    });
});
