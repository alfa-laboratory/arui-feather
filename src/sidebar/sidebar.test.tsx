/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Sidebar } from './sidebar';

describe('sidebar component', () => {
    it('should render without problems', () => {
        const sidebar = shallow(<Sidebar visible={ true }>defaultText</Sidebar>);

        expect(sidebar).toMatchSnapshot();
        expect(sidebar.find('.sidebar__content').text()).toContain('defaultText');
    });

    it('should render cross icon by default', () => {
        const sidebar = shallow(<Sidebar visible={ true }>defaultText</Sidebar>);
        const closeIcon = sidebar.find('.sidebar__closer');

        expect(closeIcon.length).toBe(1);
    });

    it('shouldn`t render cross icon with special param', () => {
        const sidebar = shallow(<Sidebar visible={ true } hasCloser={ false }>defaultText</Sidebar>);
        const closeIcon = sidebar.find('.sidebar__closer');

        expect(closeIcon.length).toBe(0);
    });

    it('should call `onCloserClick` callback after cross icon was clicked', () => {
        const onClick = jest.fn();
        const sidebar = mount(
            <Sidebar
                visible={ true }
                hasCloser={ true }
                onCloserClick={ onClick }
            >
                defaultText
            </Sidebar>
        );
        const closeIcon = sidebar.find('.sidebar__closer .icon-button');

        closeIcon.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should render with `width` from props on desktop', () => {
        const sidebar = mount(
            <Sidebar
                visible={ true }
                width={ 500 }
            >
                defaultText
            </Sidebar>
        );

        expect(sidebar.find('div.sidebar').props().style).toEqual({ width: '500px' });
    });

    it('should render with `width: 100%` on mobile', () => {
        const sidebar = mount(
            <Sidebar
                visible={ true }
                width={ 500 }
            >
                defaultText
            </Sidebar>
        );

        sidebar.setState({ isMobile: true });

        expect(sidebar.find('div.sidebar').props().style).toEqual({ width: '100%' });
    });
});
