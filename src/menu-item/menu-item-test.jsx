/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import MenuItem from './menu-item';

function renderMenuItem(props) {
    let menuItem = render(<MenuItem { ...props }>MenuItem</MenuItem>);
    let controlNode = menuItem.node.querySelector('.menu-item__control');
    let switcherNode = menuItem.node.querySelector('.dropdown__switcher');
    let popupNode = document.querySelector('.popup');

    return {
        menuItem,
        controlNode,
        switcherNode,
        popupNode
    };
}

describe('menu-item', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let { menuItem } = renderMenuItem();

        expect(menuItem.node).to.exist;
        expect(menuItem.node).to.have.text('MenuItem');
    });

    it('should render `Link` element by default', () => {
        let { controlNode } = renderMenuItem();

        expect(controlNode.tagName).to.equal('A');
        expect(controlNode).to.have.class('link');
    });

    it('should render `Link` with url', () => {
        let { controlNode } = renderMenuItem({ url: '#menu-item' });

        expect(controlNode).to.have.attr('href', '#menu-item');
    });

    it('should render just SPAN element inside when type=`block`', () => {
        let { controlNode } = renderMenuItem({ type: 'block' });

        expect(controlNode.tagName).to.equal('SPAN');
    });

    it('should render `Dropdown` with `Link` and `Popup` content from `popup` property when type=`dropdown`',
        function () {
            let {
                popupNode,
                controlNode,
                switcherNode
            } = renderMenuItem({ type: 'dropdown', popup: 'MenuItem Popup' });

            expect(switcherNode.tagName).to.equal('A');
            expect(controlNode).to.have.class('dropdown');
            expect(popupNode).to.have.text('MenuItem Popup');
        });

    it('should show popup when menu-item type=`dropdown` was hovered', () => {
        let { popupNode, switcherNode } = renderMenuItem({ type: 'dropdown' });

        simulate(switcherNode, 'mouseEnter');

        expect(popupNode).to.have.class('popup_visible');
    });

    it('should set/unset class when menu-item focus/blur', () => {
        let { controlNode, menuItem } = renderMenuItem();

        simulate(controlNode, 'focus');
        expect(menuItem.node).to.have.class('menu-item_focused');

        simulate(controlNode, 'blur');
        expect(menuItem.node).to.not.have.class('menu-item_focused');
    });

    it('should set class when menu-item hovered', () => {
        let { controlNode, menuItem } = renderMenuItem();

        simulate(controlNode, 'mouseEnter');

        expect(menuItem.node).to.have.class('menu-item_hovered');
    });

    it('should call `onClick` callback after menu-item was clicked', () => {
        let onClick = sinon.spy();
        let { controlNode } = renderMenuItem({ onClick });

        controlNode.click();

        expect(onClick).to.have.been.calledOnce;
    });

    it('should not call `onClick` callback after menu-item was clicked then disabled=true', (done) => {
        let onClick = sinon.spy();
        let { controlNode } = renderMenuItem({ onClick, disabled: true });

        controlNode.click();

        setTimeout(() => {
            expect(onClick).to.not.have.been.calledOnce;
            done();
        }, 500);
    });

    it('should prevent default link behavior when disabled=true', () => {
        let event = { preventDefault: sinon.spy() };
        let { menuItem } = renderMenuItem({ disabled: true });

        menuItem.instance.handleClick(event);

        expect(event.preventDefault).to.have.been.calledOnce;
    });

    it('should call `onFocus` callback after menu-item was focused', (done) => {
        let onFocus = sinon.spy();
        let { menuItem } = renderMenuItem({ onFocus });

        menuItem.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after menu-item was unfocused', (done) => {
        let onBlur = sinon.spy();
        let { menuItem } = renderMenuItem({ onBlur });

        menuItem.instance.focus();

        setTimeout(() => {
            menuItem.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onMouseEnter` callback after menu-item was hovered', () => {
        let onMouseEnter = sinon.spy();
        let { controlNode } = renderMenuItem({ onMouseEnter });

        simulate(controlNode, 'mouseEnter');

        expect(onMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onMouseLeave` callback after menu-item was unhovered', () => {
        let onMouseLeave = sinon.spy();
        let { controlNode } = renderMenuItem({ onMouseLeave });

        simulate(controlNode, 'mouseLeave');

        expect(onMouseLeave).to.have.been.calledOnce;
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let { menuItem } = renderMenuItem();

        let node = menuItem.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(menuItem.node);
    });
});
