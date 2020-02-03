/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { MenuItem } from './menu-item';
import { Link } from '../link/link';

describe('menu-item', () => {
    it('should render without problem', () => {
        const menuItem = shallow(
            <MenuItem>MenuItem</MenuItem>
        );

        expect(menuItem).toMatchSnapshot();
        expect(menuItem.html()).toContain('MenuItem');
    });

    it('should render `Link` element by default', () => {
        const menuItem = mount(
            <MenuItem>MenuItem</MenuItem>
        );

        expect(menuItem.find('.link').type()).toBe('a');
    });

    it('should render `Link` with url', () => {
        const menuItem = mount(
            <MenuItem url='#menu-item'>MenuItem</MenuItem>
        );

        expect(menuItem.find('.link').prop('href')).toBe('#menu-item');
    });

    it('should render just SPAN element inside when type=`block`', () => {
        const menuItem = mount(
            <MenuItem type='block'>MenuItem</MenuItem>
        );

        expect(menuItem.find('.menu-item__control').type()).toBe('span');
    });

    it('should render `Dropdown` with `Link` and `Popup` content from `popup` property when type=`dropdown`', () => {
        const menuItem = mount(
            <MenuItem type='dropdown' popup='MenuItem Popup'>MenuItem</MenuItem>
        );
        const popupNode = menuItem.find('.popup');
        const controlNode = menuItem.find('.menu-item__control').at(0);
        const switcherNode = menuItem.find('.dropdown__switcher').at(0).children();

        expect(switcherNode.type()).toBe(Link);
        expect(controlNode.prop('className')).toContain('dropdown');
        expect(popupNode.text()).toBe('MenuItem Popup');
    });

    it('should show popup when menu-item type=`dropdown` was hovered', () => {
        const menuItem = mount(
            <MenuItem type='dropdown'>MenuItem</MenuItem>
        );
        const switcherNode = menuItem.find('.dropdown__switcher').at(0);

        switcherNode.simulate('mouseEnter');

        expect(menuItem.find('.popup').prop('className')).toContain('popup_visible');
    });

    it('should set/unset class when menu-item focus/blur', () => {
        const wrapper = mount(
            <MenuItem>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('focus');

        expect(wrapper.find('.menu-item').prop('className')).toContain('menu-item_focused');

        controlNode.simulate('blur');
        expect(wrapper.find('.menu-item').prop('className')).not.toContain('menu-item_focused');
    });

    it('should set class when menu-item hovered', () => {
        const wrapper = mount(
            <MenuItem>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('mouseEnter');

        expect(wrapper.find('.menu-item').prop('className')).toContain('menu-item_hovered');
    });

    it('should call `onClick` callback after menu-item was clicked', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <MenuItem onClick={ onClick }>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call `onClick` callback after menu-item was clicked then disabled=true', () => {
        const onClick = jest.fn();
        const wrapper = mount(
            <MenuItem onClick={ onClick } disabled={ true }>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('click');

        expect(onClick).not.toHaveBeenCalled();
    });

    it('should prevent default link behavior when disabled=true', () => {
        const event = { preventDefault: jest.fn() };
        const wrapper = mount<MenuItem>(
            <MenuItem disabled={ true }>MenuItem</MenuItem>
        );

        // @ts-ignore
        wrapper.instance().handleClick(event);

        expect(event.preventDefault).toHaveBeenCalled();
    });

    it('should call `onFocus` callback after menu-item was focused', () => {
        const onFocus = jest.fn();
        const wrapper = mount(
            <MenuItem onFocus={ onFocus }>MenuItem</MenuItem>
        );

        wrapper.find('a').simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after menu-item was unfocused', () => {
        const onBlur = jest.fn();
        const wrapper = mount(
            <MenuItem onBlur={ onBlur }>MenuItem</MenuItem>
        );

        wrapper.find('a').simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onMouseEnter` callback after menu-item was hovered', () => {
        const onMouseEnter = jest.fn();
        const wrapper = mount(
            <MenuItem onMouseEnter={ onMouseEnter }>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after menu-item was unhovered', () => {
        const onMouseLeave = jest.fn();
        const wrapper = mount(
            <MenuItem onMouseLeave={ onMouseLeave }>MenuItem</MenuItem>
        );
        const controlNode = wrapper.find('.menu-item__control').at(0);

        controlNode.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const wrapper = mount<MenuItem>(
            <MenuItem>MenuItem</MenuItem>
        );

        const node = wrapper.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });

    it('should link have a theme class', () => {
        const wrapper = mount(
            <MenuItem theme='alfa-on-color'>MenuItem</MenuItem>
        );

        const linkNode = wrapper.find('.link').at(0);

        expect(linkNode.prop('className')).toContain('link_theme_alfa-on-color');
    });

    it('should dropdown have a theme class', () => {
        const wrapper = mount(
            <MenuItem theme='alfa-on-color' type='dropdown'>MenuItem</MenuItem>
        );

        const dropdownNode = wrapper.find('.dropdown').at(0);

        expect(dropdownNode.prop('className')).toContain('dropdown_theme_alfa-on-color');
    });
});
