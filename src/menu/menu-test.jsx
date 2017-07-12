/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Menu from './menu';

const MENU_ITEM1 = {
    type: 'item',
    content: 'MenuItem 1',
    value: 'value1',
    props: {
        url: '#1'
    }
};

const MENU_ITEM2 = {
    type: 'item',
    content: 'MenuItem 2',
    value: 'value2',
    props: {
        url: '#2'
    }
};

const MENU_ITEM2_CLONE = {
    type: 'item',
    content: 'MenuItem 2',
    value: 'value2',
    key: 'value3'
};

const MENU_GROUP = {
    type: 'group',
    title: 'Group Title',
    content: [
        MENU_ITEM1
    ]
};

function getNumberOfItemsWithClass(items, className) {
    let num = 0;
    [].forEach.call(items, (item) => {
        if (item.className.indexOf(className) !== -1) {
            num += 1;
        }
    });

    return num;
}

describe('menu', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let menu = render(<Menu />);

        expect(menu.node).to.exist;
    });

    it('should render menu items as type=`block` when property `mode` is identified', () => {
        let menu = render(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuFirstItemNode = menu.node.firstChild;

        expect(menuFirstItemNode).to.have.class('menu-item_type_block');
    });

    it('should render menu items in group with group title', () => {
        let menu = render(<Menu content={ [MENU_GROUP] } />);
        let menuGroupNode = menu.node.firstChild;
        let menuGroupTitleNode = menuGroupNode.firstChild;

        expect(menuGroupNode).to.have.class('menu__group');
        expect(menuGroupTitleNode).to.have.class('menu__group-title');
        expect(menuGroupTitleNode).to.have.text('Group Title');
    });

    it('should auto check first item when mode=`radio` and `checkedItems` property is empty', () => {
        let menu = render(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuFirstItemNode = menu.node.firstChild;

        expect(menuFirstItemNode).to.have.class('menu-item_checked');
    });

    it('shouldn\'t crash when mode=`radio`, and `checkedItems` and `content` properties is empty', () => {
        let menu = render(<Menu mode='radio' content={ [] } />);

        expect(menu.node).to.exist;
    });

    it('should have just one checked menu-item when mode=`radio`', () => {
        let menu = render(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.node.querySelectorAll('.menu-item');

        [].forEach.call(menuChildsNode, (child) => { child.click(); });

        let menuItemsNum = getNumberOfItemsWithClass(menuChildsNode, 'menu-item_checked');
        expect(menuItemsNum).to.equal(1);
    });

    it('should check every menu-item when mode=`check`', () => {
        let menu = render(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.node.querySelectorAll('.menu-item');

        [].forEach.call(menuChildsNode, (child) => { child.click(); });

        let menuItemsNum = getNumberOfItemsWithClass(menuChildsNode, 'menu-item_checked');
        expect(menuItemsNum).to.equal(menuChildsNode.length);
    });

    it('should disabled all menu-items when menu property disabled=true', () => {
        let menu = render(<Menu disabled={ true } content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.node.querySelectorAll('.menu-item');
        let menuItemsNum = getNumberOfItemsWithClass(menuChildsNode, 'menu-item_disabled');

        expect(menuItemsNum).to.equal(menuChildsNode.length);
    });

    it('should render without problem when give item with duplicate value', () => {
        let content = [MENU_ITEM1, MENU_ITEM2, MENU_ITEM2_CLONE];
        let menu = render(<Menu content={ content } />);
        let menuChildNodes = menu.node.querySelectorAll('.menu-item');

        expect(menuChildNodes.length).to.equal(content.length);
    });

    it('should call `onItemCheck` callback after menu-item was clicked and if `mode` is identified', () => {
        let onItemCheck = chai.spy();
        let menu = render(<Menu onItemCheck={ onItemCheck } mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuFirstItemNode = menu.node.firstChild;

        menuFirstItemNode.click();

        expect(onItemCheck).to.have.been.called.once;
    });

    it('should call `onMouseEnter` callback after menu was hovered', () => {
        let onMouseEnter = chai.spy();
        let menu = render(<Menu onMouseEnter={ onMouseEnter } />);

        simulate(menu.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.called.once;
    });

    it('should call `onMouseLeave` callback after menu was unhovered', () => {
        let onMouseLeave = chai.spy();
        let menu = render(<Menu onMouseLeave={ onMouseLeave } />);

        simulate(menu.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.called.once;
    });

    it('should set/unset class when menu-item hovered/unhovered', () => {
        let menu = render(<Menu />);

        simulate(menu.node, 'mouseEnter');
        expect(menu.node).to.have.class('menu_hovered');

        simulate(menu.node, 'mouseLeave');
        expect(menu.node).to.not.have.class('menu_hovered');
    });

    it('should focus on menu after `focus` method call', (done) => {
        let menu = render(<Menu />);

        menu.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === menu.node).to.be.true;
            done();
        }, 0);
    });

    it('should remove focus from menu after `blur` method call', (done) => {
        let menu = render(<Menu />);

        menu.instance.focus();

        setTimeout(() => {
            menu.instance.blur();

            setTimeout(() => {
                expect(document.activeElement === menu.node).to.be.false;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after menu was focused', (done) => {
        let onFocus = chai.spy();
        let menu = render(<Menu onFocus={ onFocus } />);

        menu.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after menu lost focus', (done) => {
        let onBlur = chai.spy();
        let menu = render(<Menu onBlur={ onBlur } />);

        menu.instance.focus();

        setTimeout(() => {
            menu.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called;
                done();
            }, 0);
        }, 0);
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let menu = render(<Menu />);

        let node = menu.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(menu.node);
    });
});
