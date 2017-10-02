/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import DropAround from './drop-around';

function renderDropAround(props = {}) {
    let dropAround = render(<DropAround { ...props }>Switcher-example</DropAround>);

    let switcherNode = dropAround.node.querySelector('.drop-around__switcher');
    let popupNode = document.querySelector('.popup');

    return { dropAround, popupNode, switcherNode };
}

describe('drop-around', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let { dropAround, switcherNode, popupNode } = renderDropAround({
            popupContent: 'Popup-example'
        });

        expect(dropAround.node).to.exist;
        expect(popupNode).to.have.text('Popup-example');
        expect(switcherNode).to.have.text('Switcher-example');
    });

    it('should render link switcher by default', () => {
        let { switcherNode } = renderDropAround();

        expect(switcherNode.tagName).to.equal('A');
        expect(switcherNode).to.have.class('link');
    });

    it('should render button switcher with property switcherType=`button`', () => {
        let { switcherNode } = renderDropAround({ switcherType: 'button' });

        expect(switcherNode.tagName).to.equal('BUTTON');
        expect(switcherNode).to.have.class('button');
    });

    it('should call `onSwitcherMouseEnter` callback after switcher was hovered', () => {
        let onSwitcherMouseEnter = sinon.spy();
        let { switcherNode } = renderDropAround({ onSwitcherMouseEnter, switcherType: 'button' });

        simulate(switcherNode, 'mouseEnter');

        expect(onSwitcherMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onSwitcherMouseLeave` callback after switcher was unhovered', () => {
        let onSwitcherMouseLeave = sinon.spy();
        let { switcherNode } = renderDropAround({ onSwitcherMouseLeave, switcherType: 'button' });

        simulate(switcherNode, 'mouseLeave');

        expect(onSwitcherMouseLeave).to.have.been.calledOnce;
    });

    it('should call `onSwitcherClick` callback after switcher was clicked', () => {
        let onSwitcherClick = sinon.spy();
        let { switcherNode } = renderDropAround({ onSwitcherClick, switcherType: 'button' });

        switcherNode.click();

        expect(onSwitcherClick).to.have.been.calledOnce;
    });

    it('should not call `onSwitcherClick` callback after switcher was clicked with disabled=true', () => {
        let onSwitcherClick = sinon.spy();
        let { switcherNode } = renderDropAround({ onSwitcherClick, disabled: true, switcherType: 'button' });

        switcherNode.click();

        expect(onSwitcherClick).to.not.have.been.calledOnce;
    });

    it('should call `onPopupMouseEnter` callback after popup was hovered', () => {
        let onPopupMouseEnter = sinon.spy();
        let { popupNode } = renderDropAround({ onPopupMouseEnter, opened: true });

        simulate(popupNode, 'mouseEnter');

        expect(onPopupMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onPopupMouseLeave` callback after popup was unhovered', () => {
        let onPopupMouseLeave = sinon.spy();
        let { popupNode } = renderDropAround({ onPopupMouseLeave, opened: true });

        simulate(popupNode, 'mouseLeave');

        expect(onPopupMouseLeave).to.have.been.calledOnce;
    });

    it('should set class checked to switcher button then togglable=`check` and popup open', () => {
        let { switcherNode } = renderDropAround({ togglable: 'check', opened: true, switcherType: 'button' });

        expect(switcherNode).to.have.class('button_checked');
    });

    it('should toggle popup visibility by click on switcher', () => {
        let { popupNode, switcherNode } = renderDropAround();

        switcherNode.click();
        expect(popupNode).to.have.class('popup_visible');

        switcherNode.click();
        expect(popupNode).to.not.have.class('popup_visible');
    });
});
