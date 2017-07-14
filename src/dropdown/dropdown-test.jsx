/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Dropdown from './dropdown';

function renderDropdown(props = {}) {
    let dropdown = render(<Dropdown { ...props }>Switcher-example</Dropdown>);

    let switcherNode = dropdown.node.querySelector('.dropdown__switcher');
    let popupNode = document.querySelector('.popup');

    return { dropdown, popupNode, switcherNode };
}

describe('dropdown', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let { dropdown, switcherNode, popupNode } = renderDropdown({
            popupContent: 'Popup-example'
        });

        expect(dropdown.node).to.exist;
        expect(popupNode).to.have.text('Popup-example');
        expect(switcherNode).to.have.text('Switcher-example');
    });

    it('should render link switcher by default', () => {
        let { switcherNode } = renderDropdown();

        expect(switcherNode.tagName).to.equal('A');
        expect(switcherNode).to.have.class('link');
    });

    it('should render button switcher with property switcherType=`button`', () => {
        let { switcherNode } = renderDropdown({ switcherType: 'button' });

        expect(switcherNode.tagName).to.equal('BUTTON');
        expect(switcherNode).to.have.class('button');
    });

    it('should call `onSwitcherMouseEnter` callback after switcher was hovered', () => {
        let onSwitcherMouseEnter = sinon.spy();
        let { switcherNode } = renderDropdown({ onSwitcherMouseEnter, switcherType: 'button' });

        simulate(switcherNode, 'mouseEnter');

        expect(onSwitcherMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onSwitcherMouseLeave` callback after switcher was unhovered', () => {
        let onSwitcherMouseLeave = sinon.spy();
        let { switcherNode } = renderDropdown({ onSwitcherMouseLeave, switcherType: 'button' });

        simulate(switcherNode, 'mouseLeave');

        expect(onSwitcherMouseLeave).to.have.been.calledOnce;
    });

    it('should call `onSwitcherClick` callback after switcher was clicked', () => {
        let onSwitcherClick = sinon.spy();
        let { switcherNode } = renderDropdown({ onSwitcherClick, switcherType: 'button' });

        switcherNode.click();

        expect(onSwitcherClick).to.have.been.calledOnce;
    });

    it('should not call `onSwitcherClick` callback after switcher was clicked with disabled=true', () => {
        let onSwitcherClick = sinon.spy();
        let { switcherNode } = renderDropdown({ onSwitcherClick, disabled: true, switcherType: 'button' });

        switcherNode.click();

        expect(onSwitcherClick).to.not.have.been.calledOnce;
    });

    it('should call `onPopupMouseEnter` callback after popup was hovered', () => {
        let onPopupMouseEnter = sinon.spy();
        let { popupNode } = renderDropdown({ onPopupMouseEnter, opened: true });

        simulate(popupNode, 'mouseEnter');

        expect(onPopupMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onPopupMouseLeave` callback after popup was unhovered', () => {
        let onPopupMouseLeave = sinon.spy();
        let { popupNode } = renderDropdown({ onPopupMouseLeave, opened: true });

        simulate(popupNode, 'mouseLeave');

        expect(onPopupMouseLeave).to.have.been.calledOnce;
    });

    it('should set class checked to switcher button then togglable=`check` and popup open', () => {
        let { switcherNode } = renderDropdown({ togglable: 'check', opened: true, switcherType: 'button' });

        expect(switcherNode).to.have.class('button_checked');
    });

    it('should toggle popup visibility by click on switcher', () => {
        let { popupNode, switcherNode } = renderDropdown();

        switcherNode.click();
        expect(popupNode).to.have.class('popup_visible');

        switcherNode.click();
        expect(popupNode).to.not.have.class('popup_visible');
    });
});
