/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Notification from './';

describe('notification', () => {
    it('should render without problems', () => {
        let notification = shallow(
            <Notification>
                notification-text
            </Notification>
        );

        expect(notification).toMatchSnapshot();
        expect(notification.find('.notification__content').text()).toBe('notification-text');
    });

    it('should call `onClick` callback after notification was clicked', () => {
        let onClick = jest.fn();
        let notification = mount(
            <Notification
                hasCloser={ true }
                visible={ true }
                onClick={ onClick }
            >
                notification-text
            </Notification>
        );

        notification.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should call `onCloserClick` callback after notification\'s cross was clicked', () => {
        let onCloserClick = jest.fn();
        let notification = mount(
            <Notification
                hasCloser={ true }
                visible={ true }
                onCloserClick={ onCloserClick }
            >
                notification-text
            </Notification>
        );
        let crossIconNode = notification.find('.notification__closer').at(0);

        crossIconNode.simulate('click');

        expect(onCloserClick).toHaveBeenCalled();
    });

    it('should call `onCloseTimeout` callback after close timeout was ended', (done) => {
        let onCloseTimeout = jest.fn();
        let notification = mount(
            <Notification
                hasCloser={ true }
                autoCloseDelay={ 100 }
                onCloseTimeout={ onCloseTimeout }
            >
                notification-text
            </Notification>
        );

        notification.simulate('mouseEnter');
        notification.simulate('mouseLeave');

        setTimeout(() => {
            expect(onCloseTimeout).toHaveBeenCalled();
            done();
        }, 100);
    });

    it('should call `onClickOutside` callback after click outside notification', (done) => {
        let onClickOutside = jest.fn();
        mount(
            <Notification
                visible={ true }
                onClickOutside={ onClickOutside }
            >
                notification-text
            </Notification>
        );

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

    it('should render passed custom icon component', () => {
        let notification = shallow(
            <Notification
                hasCloser={ true }
                icon={ <div className='super-icon' /> }
            >
                notification-text
            </Notification>
        );
        let iconNode = notification.find('.super-icon');

        expect(iconNode.length).toBe(1);
    });
});
