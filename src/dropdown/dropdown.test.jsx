/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import Dropdown from './dropdown';

describe('dropdown', () => {
    it('should render without problems', () => {
        let dropdown = mount(
            <Dropdown popupContent='Popup-example'>Switcher-example</Dropdown>
        );

        expect(dropdown).toMatchSnapshot();
        expect(dropdown.find('.popup').text()).toBe('Popup-example');
        expect(dropdown.find('a.dropdown__switcher').text()).toBe('Switcher-example');
    });

    it('should render link switcher by default', () => {
        let dropdown = mount(
            <Dropdown />
        );

        expect(dropdown.find('a.dropdown__switcher').props().className).toContain('link');
    });

    it('should render button switcher with property switcherType=`button`', () => {
        let dropdown = mount(
            <Dropdown switcherType='button' />
        );

        expect(dropdown.find('button.dropdown__switcher').props().className).toContain('button');
    });

    it('should call `onSwitcherMouseEnter` callback after switcher was hovered', () => {
        let onSwitcherMouseEnter = jest.fn();
        let dropdown = mount(
            <Dropdown onSwitcherMouseEnter={ onSwitcherMouseEnter } switcherType='button' />
        );
        let switcherNode = dropdown.find('button.dropdown__switcher');

        switcherNode.simulate('mouseEnter');

        expect(onSwitcherMouseEnter).toHaveBeenCalled();
    });

    it('should call `onSwitcherMouseLeave` callback after switcher was unhovered', () => {
        let onSwitcherMouseLeave = jest.fn();
        let dropdown = mount(
            <Dropdown onSwitcherMouseLeave={ onSwitcherMouseLeave } switcherType='button' />
        );
        let switcherNode = dropdown.find('button.dropdown__switcher');

        switcherNode.simulate('mouseLeave');

        expect(onSwitcherMouseLeave).toHaveBeenCalled();
    });

    it('should call `onSwitcherClick` callback after switcher was clicked', () => {
        let onSwitcherClick = jest.fn();
        let dropdown = mount(
            <Dropdown onSwitcherClick={ onSwitcherClick } switcherType='button' />
        );
        let switcherNode = dropdown.find('button.dropdown__switcher');

        switcherNode.simulate('click');

        expect(onSwitcherClick).toHaveBeenCalled();
    });

    it('should not call `onSwitcherClick` callback after switcher was clicked with disabled=true', () => {
        let onSwitcherClick = jest.fn();
        let dropdown = mount(
            <Dropdown onSwitcherClick={ onSwitcherClick } switcherType='button' disabled={ true } />
        );
        let switcherNode = dropdown.find('button.dropdown__switcher');

        switcherNode.simulate('click');

        expect(onSwitcherClick).not.toHaveBeenCalled();
    });

    it('should call `onPopupMouseEnter` callback after popup was hovered', () => {
        let onPopupMouseEnter = jest.fn();
        let dropdown = mount(
            <Dropdown onPopupMouseEnter={ onPopupMouseEnter } opened={ true } />
        );
        let popupNode = dropdown.find('.popup');

        popupNode.simulate('mouseEnter');

        expect(onPopupMouseEnter).toHaveBeenCalled();
    });

    it('should call `onPopupMouseLeave` callback after popup was unhovered', () => {
        let onPopupMouseLeave = jest.fn();
        let dropdown = mount(
            <Dropdown onPopupMouseLeave={ onPopupMouseLeave } opened={ true } />
        );
        let popupNode = dropdown.find('.popup');

        popupNode.simulate('mouseLeave');

        expect(onPopupMouseLeave).toHaveBeenCalled();
    });

    it('should set class checked to switcher button then togglable=`check` and popup open', () => {
        let dropdown = mount(
            <Dropdown togglable='check' opened={ true } switcherType='button' />
        );
        let switcherNode = dropdown.find('button.dropdown__switcher');

        expect(switcherNode.props().className).toContain('button_checked');
    });

    it('should toggle popup visibility by click on switcher', () => {
        let dropdown = mount(
            <Dropdown />
        );
        let switcherNode = dropdown.find('a.dropdown__switcher');

        switcherNode.simulate('click');
        expect(dropdown.find('.popup').props().className).toContain('popup_visible');

        switcherNode.simulate('click');
        expect(dropdown.find('.popup').props().className).not.toContain('popup_visible');
    });
});
