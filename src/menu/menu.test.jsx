/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount, shallow } from 'enzyme';

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
        let menu = mount(<Menu />);

        expect(menu).toMatchSnapshot();
    });

    it('should render menu items as type=`block` when property `mode` is identified', () => {
        let menu = mount(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuFirstItemNode = menu.find('.menu-item').at(0);

        expect(menuFirstItemNode.getDOMNode().className).toContain('menu-item_type_block');
    });

    it('should render menu items in group with group title', () => {
        let menu = mount(<Menu content={ [MENU_GROUP] } />);

        expect(menu).toMatchSnapshot();
    });

    it('should auto check first item when mode=`radio` and `checkedItems` property is empty', () => {
        let menu = mount(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuFirstItemNode = menu.find('.menu-item').at(0);

        expect(menuFirstItemNode.getDOMNode().className).toContain('menu-item_checked');
    });

    it('shouldn\'t crash when mode=`radio`, and `checkedItems` and `content` properties is empty', () => {
        let menu = mount(<Menu mode='radio' content={ [] } />);

        expect(menu).toMatchSnapshot();
    });

    it('should have just one checked menu-item when mode=`radio`', () => {
        let menu = mount(<Menu mode='radio' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.find('.menu-item');

        menuChildsNode.forEach(child => child.simulate('click'));

        let checkedMenuItems = menu.find('.menu-item_checked');
        expect(checkedMenuItems.length).toEqual(1);
    });

    it('should check every menu-item when mode=`check`', () => {
        let menu = mount(<Menu mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.find('.menu-item');

        menuChildsNode.forEach(child => child.simulate('click'));

        let checkedMenuItems = menu.find('.menu-item_checked');
        expect(checkedMenuItems.length).toEqual(menuChildsNode.length);
    });

    it('should disabled all menu-items when menu property disabled=true', () => {
        let menu = mount(<Menu disabled={ true } content={ [MENU_ITEM1, MENU_ITEM2] } />);
        let menuChildsNode = menu.find('.menu-item');
        let menuItemsNum = getNumberOfItemsWithClass(menuChildsNode, 'menu-item_disabled');

        expect(menuItemsNum).toBe(menuChildsNode.length);
    });

    it('should render without problem when give item with duplicate value', () => {
        let content = [MENU_ITEM1, MENU_ITEM2, MENU_ITEM2_CLONE];
        let menu = mount(<Menu content={ content } />);
        let menuChildNodes = menu.find('.menu-item');

        expect(menuChildNodes.length).toBe(content.length);
    });

    it('should call `onItemCheck` callback after menu-item was clicked and if `mode` is identified', () => {
        let onItemCheck = jest.fn();
        let menu = mount(<Menu onItemCheck={ onItemCheck } mode='check' content={ [MENU_ITEM1, MENU_ITEM2] } />);

        menu.find('.menu-item').first().simulate('click');

        expect(onItemCheck).toHaveBeenCalled();
    });

    it('should call `onMouseEnter` callback after menu was hovered', () => {
        let onMouseEnter = jest.fn();
        let menu = shallow(<Menu onMouseEnter={ onMouseEnter } />);

        menu.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after menu was unhovered', () => {
        let onMouseLeave = jest.fn();
        let menu = shallow(<Menu onMouseLeave={ onMouseLeave } />);

        menu.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set/unset class when menu-item hovered/unhovered', () => {
        let menu = shallow(<Menu />);

        menu.simulate('mouseEnter');
        expect(menu.hasClass('menu_hovered')).toBeTruthy();

        menu.simulate('mouseLeave');
        expect(menu.hasClass('menu_hovered')).toBeFalsy();
    });

    it('should focus on menu after `focus` method call', () => {
        let menu = mount(<Menu />);

        menu.instance().focus();

        let control = menu.instance().root;
        jest.spyOn(control, 'focus');

        menu.instance().focus();

        expect(control.focus).toHaveBeenCalled();
    });

    it('should remove focus from menu after `blur` method call', () => {
        // we need to have fake body to get document.activeElement
        document.body.innerHTML = '<button id="btn1">btn 1 </button>';
        document.getElementById('btn1').focus();

        let menu = mount(<Menu />);

        document.activeElement.blur = jest.fn();

        menu.instance().blur();

        expect(document.activeElement.blur).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after menu was focused', () => {
        let onFocus = jest.fn();
        let menu = mount(<Menu onFocus={ onFocus } />);

        menu.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after menu lost focus', () => {
        let onBlur = jest.fn();
        let menu = mount(<Menu onBlur={ onBlur } />);

        menu.simulate('blur');

        jest.runAllTimers();
        expect(onBlur).toHaveBeenCalled();
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let menu = mount(<Menu />);

        let node = menu.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });
});
