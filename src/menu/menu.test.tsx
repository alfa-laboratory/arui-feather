/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { MenuContentType, Menu } from './menu';

const MENU_ITEM1: MenuContentType = {
    type: 'item',
    content: 'MenuItem 1',
    value: 'value1',
    props: {
        url: '#1'
    }
};

const MENU_ITEM2: MenuContentType = {
    type: 'item',
    content: 'MenuItem 2',
    value: 'value2',
    props: {
        url: '#2'
    }
};

const MENU_ITEM2_CLONE: MenuContentType = {
    type: 'item',
    content: 'MenuItem 2',
    value: 'value2',
    key: 'value3'
};

const MENU_GROUP: MenuContentType = {
    type: 'group',
    title: 'Group Title',
    content: [
        MENU_ITEM1
    ]
};

function getNumberOfItemsWithClass(items, className) {
    return items.reduce((prev, item) => {
        if (item.getDOMNode().className.indexOf(className) !== -1) {
            return prev + 1;
        }

        return prev;
    }, 0);
}

describe('menu', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should render without problem', () => {
        const menu = mount(<Menu />);

        expect(menu).toMatchSnapshot();
    });

    it('should render menu items as type=`block` when property `mode` is identified', () => {
        const menu = mount(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        const menuFirstItemNode = menu.find('.menu-item').at(0);

        expect(menuFirstItemNode.getDOMNode().className).toContain('menu-item_type_block');
    });

    it('should render menu items in group with group title', () => {
        const menu = mount(<Menu content={ [MENU_GROUP] } />);

        expect(menu).toMatchSnapshot();
    });

    it('should auto check first item when mode=`radio` and `checkedItems` property is empty', () => {
        const menu = mount(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        const menuFirstItemNode = menu.find('.menu-item').at(0);

        expect(menuFirstItemNode.getDOMNode().className).toContain('menu-item_checked');
    });

    it('shouldn\'t crash when mode=`radio`, and `checkedItems` and `content` properties is empty', () => {
        const menu = mount(<Menu mode='radio' content={ [] } />);

        expect(menu).toMatchSnapshot();
    });

    it('should have just one checked menu-item when mode=`radio`', () => {
        const menu = mount(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        const menuChildsNode = menu.find('.menu-item');

        menuChildsNode.forEach(child => child.simulate('click'));

        const checkedMenuItems = menu.find('.menu-item_checked');

        expect(checkedMenuItems.length).toEqual(1);
    });

    it('should check every menu-item when mode=`check`', () => {
        const menu = mount(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        const menuChildsNode = menu.find('.menu-item');

        menuChildsNode.forEach(child => child.simulate('click'));

        const checkedMenuItems = menu.find('.menu-item_checked');

        expect(checkedMenuItems.length).toEqual(menuChildsNode.length);
    });

    it('should disabled all menu-items when menu property disabled=true', () => {
        const menu = mount(<Menu disabled={ true } content={ [MENU_ITEM1, MENU_ITEM2] } />);
        const menuChildsNode = menu.find('.menu-item');
        const menuItemsNum = getNumberOfItemsWithClass(menuChildsNode, 'menu-item_disabled');

        expect(menuItemsNum).toBe(menuChildsNode.length);
    });

    it('should render without problem when give item with duplicate value', () => {
        const content = [MENU_ITEM1, MENU_ITEM2, MENU_ITEM2_CLONE];
        const menu = mount(<Menu content={ content } />);
        const menuChildNodes = menu.find('.menu-item');

        expect(menuChildNodes.length).toBe(content.length);
    });

    it('should call `onItemCheck` callback after menu-item was clicked and if `mode` is identified', () => {
        const onItemCheck = jest.fn();
        const menu = mount(<Menu onItemCheck={ onItemCheck } mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);

        menu.find('.menu-item').first().simulate('click');

        expect(onItemCheck).toHaveBeenCalled();
    });

    it('should call `onMouseEnter` callback after menu was hovered', () => {
        const onMouseEnter = jest.fn();
        const menu = shallow(<Menu onMouseEnter={ onMouseEnter } />);

        menu.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after menu was unhovered', () => {
        const onMouseLeave = jest.fn();
        const menu = shallow(<Menu onMouseLeave={ onMouseLeave } />);

        menu.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set/unset class when menu-item hovered/unhovered', () => {
        const menu = shallow(<Menu />);

        menu.simulate('mouseEnter');
        expect(menu.hasClass('menu_hovered')).toBeTruthy();

        menu.simulate('mouseLeave');
        expect(menu.hasClass('menu_hovered')).toBeFalsy();
    });

    it('should focus on menu after `focus` method call', () => {
        const menu = mount<Menu>(<Menu />);

        menu.instance().focus();

        const control = menu.instance().root;

        jest.spyOn(control, 'focus');

        menu.instance().focus();

        expect(control.focus).toHaveBeenCalled();
    });

    it('should remove focus from menu after `blur` method call', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        const menu = mount<Menu>(<Menu />);

        (document.activeElement as HTMLElement).blur = jest.fn();

        menu.instance().blur();

        expect((document.activeElement as HTMLElement).blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after menu was focused', () => {
        const onFocus = jest.fn();
        const menu = mount(<Menu onFocus={ onFocus } />);

        menu.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after menu lost focus', () => {
        const onBlur = jest.fn();
        const menu = mount(<Menu onBlur={ onBlur } />);

        menu.simulate('blur');

        jest.runAllTimers();
        expect(onBlur).toHaveBeenCalled();
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const menu = mount<Menu>(<Menu />);

        const node = menu.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
