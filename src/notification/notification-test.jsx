/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Notification from './notification';

describe('notification', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let notification = render(
            <Notification position={ [0, 0] }>
                notification-text
            </Notification>
        );

        expect(notification.node).to.exist;
        expect(notification.node.querySelector('.notification__content')).to.have.text('notification-text');
    });

    it('should call `onClick` callback after notification was clicked', () => {
        let onClick = sinon.spy();
        let notification = render(
            <Notification
                position={ [0, 0] }
                hasCloser={ true }
                visible={ true }
                onClick={ onClick }
            >
                notification-text
            </Notification>
        );

        notification.node.click();

        expect(onClick).to.have.been.calledOnce;
    });

    it('should call `onCloserClick` callback after notification\'s cross was clicked', () => {
        let onCloserClick = sinon.spy();
        let notification = render(
            <Notification
                position={ [0, 0] }
                hasCloser={ true }
                visible={ true }
                onCloserClick={ onCloserClick }
            >
                notification-text
            </Notification>
        );
        let crossIconNode = notification.node.querySelector('.notification__closer');

        crossIconNode.click();

        expect(onCloserClick).to.have.been.calledOnce;
    });

    it('should call `onCloseTimeout` callback after close timeout was ended', (done) => {
        let onCloseTimeout = sinon.spy();
        let notification = render(
            <Notification
                position={ [0, 0] }
                hasCloser={ true }
                autoCloseDelay={ 100 }
                onCloseTimeout={ onCloseTimeout }
            >
                notification-text
            </Notification>
        );

        simulate(notification.node, 'mouseEnter');
        simulate(notification.node, 'mouseLeave');

        setTimeout(() => {
            expect(onCloseTimeout).to.have.been.calledOnce;
            done();
        }, 100);
    });

    it('should render passed custom icon component', () => {
        let notification = render(
            <Notification
                position={ [0, 0] }
                hasCloser={ true }
                icon={ <div className='super-icon' /> }
            >
                notification-text
            </Notification>
        );
        let iconNode = notification.node.querySelector('.super-icon');

        expect(iconNode).to.exist;
    });
});
